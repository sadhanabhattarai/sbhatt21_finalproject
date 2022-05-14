#!/usr/local/bin/python3

import cgi, json
import os
import mysql.connector

def main():
    print("Content-Type: application/json\n\n")
    form = cgi.FieldStorage()
    term = form.getvalue('search_term')
    
    conn = mysql.connector.connect(user='sbhatt21', password='California1993#', host='localhost', database='sbhatt21')	

    cursor = conn.cursor()
   
    qry = """
          SELECT Cell_Line, Primary_Disease, Disease_Subtype, Lineage, Lineage_Subtype, TCGA_Hotspot_count
            FROM tp53_gene_table
           WHERE Lineage LIKE %s
    """
    cursor.execute(qry, ('%' + term + '%', ))

    results = { 'match_count': 0, 'matches': list() }
    for (Cell_Line, Primary_Disease, Disease_Subtype, Lineage, Lineage_Subtype, TCGA_Hotspot_count) in cursor:
        results['matches'].append({'Cell_Line': Cell_Line, 'Primary_Disease': Primary_Disease, 'Disease_Subtype': Disease_Subtype, 'Lineage': Lineage, 'Lineage_Subtype': Lineage_Subtype, 'TCGA_Hotspot_count': TCGA_Hotspot_count})
        results['match_count'] += 1

    conn.close()

    print(json.dumps(results))


if __name__ == '__main__':
    main()
