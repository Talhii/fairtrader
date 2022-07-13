const axios = require("axios");


exports.Checking = async (user) => {
  const data = await axios({
    method: "get",
    url: "https://api.getresponse.com/v3/campaigns/Z8UWT/contacts?perPage=100000000",
    headers: { 
      "X-Auth-Token": "api-key 2k2b6nc004oy2ska7n4qmendkt3itnod",
      "Content-Type": "application/json",
    },
  });  
  const re = await data.data.find((q) => {
    return q.email == user.email;
  });
  if (re) {
    return false;
  } else {
    return true;
  }
};

exports.initializeGetResponse = async (user) => {
  
  const data = await axios({
    method: "post",
    url: "https://api.getresponse.com/v3/contacts",
    data: {
      email: user.email,
      name: `${user.name} ${user.lastName}`,
      campaign: {
        campaignId: "Z8UWT",
      },
      tags: [
        {
          tagId: "Vxbnd",
        },
      ],
    },
    headers: {
      "X-Auth-Token": "api-key 2k2b6nc004oy2ska7n4qmendkt3itnod",
      "Content-Type": "application/json",
    },
  });
  console.log("completed");
};

exports.GetResponseCom = async (user) => {
  const data = await axios({
    method: "get",
    url: "https://api.getresponse.com/v3/campaigns/Z8UWT/contacts?perPage=100000000",
    headers: {
      "X-Auth-Token": "api-key 2k2b6nc004oy2ska7n4qmendkt3itnod",
      "Content-Type": "application/json",
    },
  });
  const usr = user.dataValues;
  const re = await data.data.find((q) => {
    return q.email == usr.email;
  });
  if (!re) {
    return false;
  }
  setTimeout(() => {
    axios({
      method: "post",
      url: `https://api.getresponse.com/v3/contacts/${re.contactId}`,
      data: {
        email: usr.email,
        name: `${usr.name} ${usr.lastName}`,
        campaign: {
          campaignId: "Z8UWT",
        },
        tags: [
          {
            tagId: "Vxb4I",
          },
        ],
        customFieldValues: [
          {
            customFieldId: "pzvJpS",
            value: [usr.country  ||"  "],
          },
          {
            customFieldId: "pzvJ6c",
            value: [usr.city  ||"  "],
          },
          {
            customFieldId: "pQz6Pd",
            value: [usr.phone  ||"  "],
          },
          {
            customFieldId: "prAC5d",
            value: [usr.language.length ? usr.language.lang[0]: "  "],
          },
          {
            customFieldId: "pzvJMY",
            value: [usr.industry.length ? usr.industry.indus[0]: "  "],
          },
          {
            customFieldId: "prEqpj",
            value: [usr.businessName  ||"  "],
          },
          {
            customFieldId:"pQqlQf",
            value:[usr.cardNumber ||"  "]
          }
        ],
      },
      headers: {
        "X-Auth-Token": "api-key 2k2b6nc004oy2ska7n4qmendkt3itnod",
        "Content-Type": "application/json",
      },
    });
    console.log("completed");
  }, 2000);
};