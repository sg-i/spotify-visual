import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import similarity from 'compute-cosine-similarity';
import { SongDataType } from '../types';

// Считывание csv файла
const csvFilePath = path.resolve(__dirname, '../data/Most Streamed Spotify Songs 2024.csv');
const csvData = fs.readFileSync(csvFilePath, 'utf8');
const SpotifyData = Papa.parse<SongDataType>(csvData, {
  header: true,
  skipEmptyLines: true
}).data;

// Возвращает исправленный вектор необходимых параметров
function getSongData(i:number){
    // Убирает запятые и делает числом
    function fix(elem: string){
        return Number(elem.replace(/\D/g,'')) || 0
    }
    return [
        fix(SpotifyData[i]['TikTok Likes']), 
        fix(SpotifyData[i]['TikTok Views']), 
        fix(SpotifyData[i]['TikTok Posts']), 
        fix(SpotifyData[i]['YouTube Likes']),
        fix(SpotifyData[i]['YouTube Views']),
        fix(SpotifyData[i]['YouTube Playlist Reach']),
        fix(SpotifyData[i]['Spotify Streams']),
        fix(SpotifyData[i]['Spotify Playlist Count']),
        fix(SpotifyData[i]['Spotify Playlist Reach']),
        fix(SpotifyData[i]['Apple Music Playlist Count']),
        fix(SpotifyData[i]['AirPlay Spins']),
        fix(SpotifyData[i]['Pandora Streams']),
        fix(SpotifyData[i]['Pandora Track Stations']),
        fix(SpotifyData[i]['Shazam Counts']),
        fix(SpotifyData[i]['Explicit Track']),
    ]
}

// Анализируются 400 песен
// Создает файл similarities.json. Свойства созданного объекта:
//  - links: {source, target, value }[]
//  - nodes: {id, Track, Spotify Streams}[]
export function calculateSimilarities() {
    fs.writeFileSync('similarities.json', '[\n');
    fs.appendFileSync('similarities.json', '{"links":[\n');
    const nodes: { id: string,
        "Track": string,
        "Spotify Streams": string
     }[] = []
    
    for (let i = 0; i < Math.min(400,SpotifyData.length); i++) {
        const isrcI = SpotifyData[i].ISRC;
        let jsonString = '';
        for (let j = i + 1; j < Math.min(400,SpotifyData.length); j++) {
            const isrcJ = SpotifyData[j].ISRC;
            // Сохраняем частично рассчитанные данные на диск
            const link = {
                source: isrcI,
                target: isrcJ,
                //Расчет схожести двух песен
                value: similarity(getSongData(i), getSongData(j)) || 0
            };
            // Преобразуем объект в строку и добавляем в jsonString
            jsonString += JSON.stringify(link, null, 2) + ',\n';
        }
        fs.appendFileSync('similarities.json', jsonString)
        nodes.push({
            id: isrcI,
            "Track": SpotifyData[i].Track,
            "Spotify Streams": SpotifyData[i]['Spotify Streams'].replace(/,/g, '')
        })
    }
    fs.appendFileSync('similarities.json', '],\n');
    fs.appendFileSync('similarities.json', '"nodes":\n');
    fs.appendFileSync('similarities.json', JSON.stringify(nodes, null, 2) + '\n');
    fs.appendFileSync('similarities.json', '}]\n');
}