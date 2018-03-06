const ASSETS = {};

export default class Asset {
    static loadAll(assets = []) {
        assets.map(asset => Asset.load(asset));
    }

    static load(asset = {}) {
        const img = new Image();
        img.onload = () => ASSETS[asset.id] = img;
        img.src = asset.src;
    }

    static get(id) {
        if (!ASSETS.hasOwnProperty(id)) {
            return null;
        }
        return ASSETS[id];
    }
}
