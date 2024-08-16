import fs from 'fs';
import * as d3 from 'd3';
import {  Node } from '../types';

// Считывание данных из файла similarities.json и
// расчет координат узлов графа. Сохранение результатов
// в файл graph.json в папку с React проектом
export function calculateGraph(){
    const rawData = fs.readFileSync('similarities.json', 'utf-8');
    const similarityData = JSON.parse(rawData)[0];
  
    const nodes:Node[] = similarityData.nodes;
    const links:{ source: string, target: string, value: number }[] = similarityData.links;
  
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).strength((d: any) => d.value))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(500, 500)) 
      .force('collision', d3.forceCollide().radius(50));
  
      simulation.on('end', () => {
        // После завершения симуляции сохраняем координаты
        const graph = {
          nodes: nodes.map(node => ({
            id: node.id,
            x: node.x,
            y: node.y,
            "Track": node["Track"],
            "Spotify Streams": node["Spotify Streams"]
          })),
          links: links.map(link => ({
            source: link.source,
            target: link.target,
            value: link.value
          }))
        };
      
        // Сохраняем результат в JSON файл
        fs.writeFileSync('spotify-visual-map/public/graph.json', JSON.stringify(graph, null, 2));
      });
      
    simulation.tick(300);
  }