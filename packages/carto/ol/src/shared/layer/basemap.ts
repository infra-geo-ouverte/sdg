import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';

export const TOPO_BASEMAP = new TileLayer({
  properties: { title: 'Carte' },
  source: new XYZ({
    attributions:
      "© <a href='http://www.droitauteur.gouv.qc.ca/copyright.php' target='_blank'><img src='https://geoegl.msp.gouv.qc.ca/gouvouvert/public/images/quebec/gouv_qc_logo.png' width='64' height='14'>Gouvernement du Québec</a> / <a href='https://www.igouverte.org/' target='_blank'>IGO2</a>",
    crossOrigin: 'anonymous',
    url: 'https://carto.msp.gouv.qc.ca/tms/1.0.0/carte_gouv_qc_public@EPSG_3857/{z}/{x}/{-y}.png'
  })
});

export const IMAGERY_BASEMAP = new TileLayer({
  properties: { title: 'Imagerie' },
  visible: false,
  source: new XYZ({
    crossOrigin: 'anonymous',
    maxZoom: 17,
    attributions:
      "© <a href='http://www.droitauteur.gouv.qc.ca/copyright.php' target='_blank'><img src='https://geoegl.msp.gouv.qc.ca/gouvouvert/public/images/quebec/gouv_qc_logo.png' width='64' height='14'>Gouvernement du Québec</a> / <a href='https://www.igouverte.org/' target='_blank'>IGO2</a>",
    url: 'https://carto.msp.gouv.qc.ca/tms/1.0.0/orthos@EPSG_3857/{z}/{x}/{-y}.jpeg'
  })
});
