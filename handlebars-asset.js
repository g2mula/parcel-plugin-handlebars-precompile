const Handlebars = require('handlebars');
const JSAsset = require('parcel-bundler/src/assets/JSAsset');

class HbsAsset extends JSAsset {
    async pretransform() {
        const precompiled = Handlebars.precompile(this.contents);
        this.contents = `
                import Handlebars from 'handlebars/dist/handlebars.runtime';
                Handlebars.registerPartial('${this.name}', ${precompiled});
                const templateFunction = Handlebars.template(${precompiled});
                export default templateFunction;
                `;

        return await super.pretransform();
    }
}

module.exports = HbsAsset;
