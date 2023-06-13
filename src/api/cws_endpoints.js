import http from "./https";
import { url } from "../../config.json";

const balance_inquiry = url + "/api/balance-inquiry";
const deposit = url + "/api/deposit";
const withdraw = url + "/api/withdraw";
const validate = url + "/api/validate";

export async function getBalance() {
  return await http.get(balance_inquiry);
}

export async function doDeposit(amount) {
  return await http.put(deposit, { amount: amount });
}

export async function doWithdraw(amount) {
  return await http.put(withdraw, { amount: amount });
}

export async function validatePin(pin) {
  return await http.post(validate, { pin: pin });
}

export default {
  getBalance,
  doDeposit,
  doWithdraw,
  validatePin,
};
