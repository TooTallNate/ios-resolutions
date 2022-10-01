import fs from 'node:fs';
import fetch from 'node-fetch';
import { camelCase } from 'camel-case';
import * as cheerio from 'cheerio';

const res = await fetch('https://www.ios-resolution.com/');
const body = await res.text();

const $ = cheerio.load(body);
const columns = $('table thead th').toArray().map(th => {
    return camelCase($(th).text());
});

const rows = $('table tbody tr');
const data = rows.toArray().map(row => {
    const entryColumns = $(row).children('td').toArray().map((td) => {
        $(td).children('.mobile').remove();
        return $(td).text();
    })
    const rowData: Record<string, number | string> = {};
    entryColumns.forEach((v, i) => {
        const value = entryColumns[i];
        const numValue = Number(value);
        rowData[columns[i]] = Number.isNaN(numValue) ? value : numValue;
    });
    return rowData;
});

await fs.promises.writeFile('data.json', JSON.stringify(data, null, 2));