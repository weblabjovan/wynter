import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from "path";
import { parse } from 'csv-parse'


export default function getProducts(
  req: NextApiRequest,
  res: NextApiResponse<any>
) { 
  const dataPath = path.join(process.cwd(), 'data/products.csv');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    parse(data, (err, records) => {
      if (err) {
        console.error(err);
        return res.status(400).json({success: false, message: 'Parse error occurred'});
      }

      const productList = records.slice(1).map((record: string[]) => {
        const resultItem: Record<string, any> = {}
        record.forEach((value, item) => {
          const key = records[0][item].replace(/\s+/g, '_').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
          resultItem[key] = value;
        });

        return resultItem;
      });
  
      return res.status(200).json(productList);
    })
  });
};