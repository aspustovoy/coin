// eslint-disable-next-line import/no-unresolved
import * as ymaps3 from 'ymaps3';

export default function mapAPI() {
  const data = JSON.parse(localStorage.getItem('banksData'));

  const points = [];

  if (data.length > 0) {
    data.forEach((i) => {
      points.push({
        coordinates: [i.lon, i.lat],
      });
    });
  }

  async function initMap() {
    await ymaps3.ready;

    const LOCATION = { center: [37.588144, 55.733842], zoom: 11 };

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapControls,
      YMapDefaultFeaturesLayer,
    } = ymaps3;

    const { YMapZoomControl } = await ymaps3.import(
      '@yandex/ymaps3-controls@0.0.1',
    );
    const { YMapDefaultMarker } = await ymaps3.import(
      '@yandex/ymaps3-markers@0.0.1',
    );

    const map = new YMap(document.getElementById('app'), {
      location: LOCATION,
    });

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());
    map.addChild(
      new YMapControls({ position: 'right' }).addChild(new YMapZoomControl({})),
    );

    points.forEach((point) => {
      map.addChild(new YMapDefaultMarker(point));
    });
  }

  initMap();
}
