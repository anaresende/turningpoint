const axios = require("axios");
const { response } = require("express");
const qs = require("qs");

class MoloniApi {
  constructor(baseURL) {
    (this.baseURL = baseURL),
      (this.api = axios.create({
        baseURL: "https://api.moloni.pt/v1/" || this.baseURL,
        timeout: 3000,
        params: {
          access_token: process.env.ACCESS_TOKEN,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }));
  }

  getByVat = (vat) => {
    const data = {
      company_id: 89905,
      vat: vat,
    };

    const customerDetail = this.api.request({
      url: "/customers/getByVat/",
      data: qs.stringify(data),
      method: "POST",
    });
    console.log(customerDetail);
    return customerDetail;
  };

  getInvoices = (customer_id) => {
    console.log("get invoices", customer_id);
    const data = {
      company_id: 89905,
      customer_id: customer_id,
    };

    const invoices = this.api.request({
      url: "/documents/getAll/",
      data: qs.stringify(data),
      method: "POST",
    });
    return invoices;
  };

  getPDFLink = (document_id) => {
    const data = {
      company_id: 89905,
      document_id: document_id,
    };

    const pdfLink = this.api.request({
      url: "/documents/getPDFLink/",
      data: qs.stringify(data),
      method: "POST",
    });
    return pdfLink;
  };

  getCountClients = () => {
    const data = { company_id: 89905 };

    const numberOfClients = this.api.request({
      url: "/customers/count/",
      data: qs.stringify(data),
      method: "POST",
    });
    return numberOfClients;
  };
}

module.exports = new MoloniApi();
