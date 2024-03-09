import { Request, Response } from 'express';

import { SlotsModel } from '../db/slots';
import { MedicineModel } from '../db/medicine';
import { IMedicine } from '../interface';
import {
  med_schema,
  med_update_schema,
} from '../validation';
import {
  empty_list,
  revalidate_medicine,
  revalidate_busket,
  lists_of_items,
  successfully_created,
  successfully_updated,
  successfully_deleted,
  something_wrong,
} from '../config/content';

/* 
  @method: GET
  @endpoint: /v1/:slotid/meds
  @details: all medicine lists
*/
export const get_all_meds = async (
  req: Request,
  res: Response
) => {
  try {
    const { slotid } = req.params;
    // const view_info = await SlotsModel.findById(slotid);
    const meds = await MedicineModel.find({
      slotid,
    });
    return res.json({
      code: 200,
      data: meds,
      message: meds.length ? lists_of_items : empty_list,
    });
  } catch (err) {
    return res.json({
      code: 400,
      data: null,
      message: something_wrong,
    });
  }
};

/* 
  @method: GET
  @endpoint: /v1/:slotid/med/:medid
  @details: view medicine
*/
export const view_med = async (
  req: Request,
  res: Response
) => {
  try {
    const { medid } = req.params;
    const view_info = await MedicineModel.findById(medid);
    return res.json({
      code: 200,
      data: view_info,
      message: null,
    });
  } catch (err) {
    return res.json({
      code: 400,
      data: null,
      message: something_wrong,
    });
  }
};

/* 
  @method: POST
  @endpoint: /v1/:slotid/med
  @details: create medicine
*/
export const create_med = async (
  req: Request,
  res: Response
) => {
  const { name, busket_id, pices, price, exp_date } =
    req.body;

  const { error } = med_schema.validate({
    name,
    busket_id,
    pices,
    price,
    exp_date,
  });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  try {
    const { slotid } = req.params;

    const existing_slot_id = await MedicineModel.findOne({
      slotid,
    });
    const existing_name = await MedicineModel.findOne({
      name,
    });
    if (existing_slot_id && existing_name) {
      return res.status(400).json({
        msg: `${existing_name.name} ${revalidate_medicine}`,
      });
    }

    const existing_busket_id = await MedicineModel.findOne({
      busket_id,
    });
    if (existing_slot_id && existing_busket_id) {
      return res.status(400).json({
        msg: `Busket ID ${existing_busket_id.busket_id} ${revalidate_busket}`,
      });
    }

    const med: IMedicine = new MedicineModel({
      slotid,
      name,
      busket_id,
      pices,
      price,
      exp_date,
      per_pices: Math.floor(price / pices),
    });
    await med.save();
    return res.json({
      code: 200,
      data: med,
      message: successfully_created,
    });
  } catch (err) {
    return res.json({
      code: 400,
      data: null,
      message: something_wrong,
    });
  }
};

/* 
  @method: PATCH
  @endpoint: /v1/:slotid/med/:medid
  @details: update medicine
*/
export const update_med = async (
  req: Request,
  res: Response
) => {
  const { name, pices, price, exp_date } = req.body;

  const { error } = med_update_schema.validate({
    name,
    pices,
    price,
    exp_date,
  });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  try {
    const existing_name = await MedicineModel.findOne({
      name,
    });
    if (existing_name) {
      return res.status(400).json({
        msg: `${existing_name.name} ${revalidate_medicine}`,
      });
    }

    const { medid } = req.params;
    await MedicineModel.findByIdAndUpdate(medid, {
      name,
      pices,
      price,
      exp_date,
      per_pices: Math.floor(price / pices),
    });
    const updated_info =
      await MedicineModel.findById(medid);
    return res.json({
      code: 200,
      data: updated_info,
      message: successfully_updated,
    });
  } catch (err) {
    return res.json({
      code: 400,
      data: null,
      message: something_wrong,
    });
  }
};

/* 
  @method: DELETE
  @endpoint: /v1/:slotid/med/:medid
  @details: delete medicine
*/
export const remove_med = async (
  req: Request,
  res: Response
) => {
  try {
    const { medid } = req.params;
    const view_info = await MedicineModel.findById(medid);
    await MedicineModel.findOneAndDelete({ _id: medid });
    return res.json({
      code: 200,
      data: null,
      message: `${view_info.name} ${successfully_deleted}`,
    });
  } catch (err) {
    return res.json({
      code: 400,
      data: null,
      message: something_wrong,
    });
  }
};
