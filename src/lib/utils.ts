import { Request } from "express";
import moment from "moment";

const formatDate = (date: any, format: string = "YYYY-MM-DD") => {
  return moment(date).format(format);
};

export { formatDate };
