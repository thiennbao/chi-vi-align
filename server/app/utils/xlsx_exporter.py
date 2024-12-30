import json
import os
from xlsxwriter.workbook import Workbook

class XLSXExporter():
  def _mark_color(self, box):
    src, des = box['ocr_char_align'], box['chi_char_align']
    similar = [[] for _ in range(len(src))]
    for similar_char in box['similar']:
      char_index = src.find(similar_char[0])
      if char_index != -1:
        similar[char_index] = similar_char

    color = []
    for src_char, des_char, similar_chars in zip(src, des, similar):
      if src_char == des_char or src_char == '_': color.append('normal')
      elif des_char == '_': color.append('green')
      elif des_char in similar_chars: color.append('blue')
      else: color.append('red')
    return color

  def export(self, workdir: str):
    # Read data
    with open(f'{workdir}/result.json', 'r', encoding='utf-8') as file:
      data = json.load(file)
    
    # Mark color
    for box in data:
      box['color'] = self._mark_color(box)

    # Create xlsx file
    xlsx_name = f'{workdir}/result.xlsx'
    workbook = Workbook(xlsx_name)
    worksheet = workbook.add_worksheet()
    worksheet.set_column('A:A', 60)
    worksheet.set_column('B:B', 60)
    worksheet.set_column('C:C', 100)
    worksheet.set_column('D:D', 100)
    worksheet.set_column('E:E', 100)
    # Declare color
    colors = {
      'normal': workbook.add_format(),
      'red': workbook.add_format({'color': '#dc2626'}),
      'green': workbook.add_format({'color': '#16a34a'}),
      'blue': workbook.add_format({'color': '#0891b2'}),
    }
    # Column header
    headers = ['Image Box', 'Chinese Ocr', 'Chinese Text', 'Vietnamese TexT']
    worksheet.write_row('A1', headers)
    # Write data
    for row_num, box in enumerate(data, start=1):
      worksheet.write(row_num, 0, str(box['position']))
      if box['chi_char_align']:
        ocr_format = []
        for i in range(len(box['ocr_char_align'])):
          ocr_format.extend((colors[box['color'][i]], box['ocr_char_align'][i]))
        worksheet.write_rich_string(row_num, 1, *ocr_format)
      else:
        worksheet.write(row_num, 1, box['ocr'], colors['green'])
      worksheet.write(row_num, 2, box['chi_char_align'] or '[No text matched]')
      worksheet.write(row_num, 3, box['vi_aligned'].replace('. -', '') if box['vi_aligned'] else '[No text matched]')
      # Coloring ocr
    workbook.close()