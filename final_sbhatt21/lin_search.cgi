#!/usr/local/bin/python3

import cgi, json
import os
import mysql.connector

def main():
    print("Content-Type: application/json\n\n")
    data = cgi.FieldStorage()
    term = data.getvalue('foo')
    conn = mysql.connector.connect(user='sbhatt21', password='California1993#', host='localhost', database='sbhatt21')

    cursor = conn.cursor()

    qry = """
          SELECT Cell_Line, Depmap_Id, Primary_Disease, Disease_Subtype, Lineage, Lineage_Subtype, Chr, Start_Position, End_Position, Variant_Classification, TCGA_Hotspot_count, Cosmic_Hs_Cnt
            FROM tp53_gene_table
           WHERE Lineage LIKE %s
    """
    cursor.execute(qry, ('%' + term + '%', ))

    results = { 'match_count': 0, 'matches': list() }
    for (Cell_Line, Depmap_Id ,Primary_Disease, Disease_Subtype, Lineage, Lineage_Subtype, Chr, Start_Position, End_Position, Variant_Classification, TCGA_Hotspot_count, Cosmic_Hs_Cnt) in cursor:
        results['matches'].append({'Cell_Line': Cell_Line, 'Depmap_Id': Depmap_Id, 'Primary_Disease': Primary_Disease, 'Disease_Subtype': Disease_Subtype, 'Lineage': Lineage, 'Lineage_Subtype': Lineage_Subtype, 'Chr': Chr, 'Start_Position': Start_Position, 'End_Position': End_Position, 'Variant_Classification': Variant_Classification, 'TCGA_Hotspot_count': TCGA_Hotspot_count, 'Cosmic_Hs_Cnt': Cosmic_Hs_Cnt})
        results['match_count'] += 1

    conn.close()

    print(json.dumps(results))

if __name__ == '__main__':
    main()
