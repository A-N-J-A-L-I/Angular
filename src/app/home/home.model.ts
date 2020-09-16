import {HouseRoofType} from '../house-roof-type/house-roof-type.model';
import {HouseConsumption} from "../house-consumption/house-consumption.model";

class  FormDataModel {
  leadId: string;
  roofArea: number;
  roofSurfaceNumber: number;
  roofType: HouseRoofType;
  roofPitch: number;
  alignment: number;
  // consumption: any;
  consumption: HouseConsumption;
  hotWaterType: string;
  heaterType: string;
  electric: number;
  location: any;
}

export {
  FormDataModel
};
