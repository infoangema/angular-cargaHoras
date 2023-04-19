import * as moment from "moment/moment";

export class Utils {
	static isEmpty(obj: any) {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	}

	static mergeDeep(target: any, source: any) {
		const output = Object.assign({}, target);
		if (this.isObject(target) && this.isObject(source)) {
			Object.keys(source).forEach(key => {
				if (this.isObject(source[key])) {
					if (!(key in target)) {
						Object.assign(output, {
							[key]: source[key]
						});
					} else {
						output[key] = this.mergeDeep(target[key], source[key]);
					}
				} else {
					Object.assign(output, {
						[key]: source[key]
					});
				}
			});
		}
		return output;

	}

	static isObject(item: any) {
		return (item && typeof item === 'object' && !Array.isArray(item));
	}

  static getDateMoment(date: any) {
    return moment( date ).format( 'DD-MM-YYYY' )
  }
}
