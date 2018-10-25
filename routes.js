const express = require('express');
const router = express.Router();
const axios = require('axios')
const dayjs = require('dayjs')
const db = require('./server/db');
const { dataBase } = require('./server/config');
const { getNextSequenceValue, getCityEntityByHostName, getCityEntity } = require('./server/tools');
var ObjectId = require('mongodb').ObjectId


const removeProcessor = (data) => {
  const avliableKeys = {}
  Object.keys(data).filter(a => !a.startsWith('$')).forEach(a => {
    avliableKeys[a] = data[a];
  })

  return avliableKeys;
}

const errorHandler = (res) => {
  console.log(res);
}

const dbAction = {
  Ids: (city, date) => {
    return new Promise((resolve, reject) => {
      db.open(dataBase).then(dbo => {

        return dbo.collection('posts').find({ city, date }).project({ '_id': 1 }).toArray()
      }).then(resolve).catch(errorHandler).finally(() => {
        db.close()
      })
    })
  },
  post: async (rows, city, date) => {
    return new Promise((resolve, reject) => {
      db.open(dataBase).then((dbo) => dbo.createCollection('posts')).then(r => {
        const method = Array.isArray(rows) ? 'insertMany' : 'insertOne';

        if (Array.isArray(rows)) {
          rows.forEach(a => {
            // a._id = getNextSequenceValue(dbo, 'postId')
            a.city = city;
            a.date = date;
          })
        } else {
          rows.city = city
          rows.date = date
        }

        return r[method](rows);
      }).then(resolve).catch(errorHandler).finally(() => {
        db.close();
      })

    })
  },
  get: async (data) => {

    return new Promise((resolve, reject) => {
      db.open(dataBase).then((dbo) => dbo.collection('posts')).then(r => {

        if (data._id) {
          data._id = ObjectId(data._id);
        }

        let execute = r.find(removeProcessor(data) || {});
        let querys = null;
        if (data.$fields) {
          querys = {};
          data.$fields.split(',').forEach(a => querys[a] = 1);

          execute = execute.project(querys)
        }
        if (data.$limit) {
          execute = execute.limit(parseInt(data.$limit))
        }
        if (data.$skip) {
          execute = execute.skip(parseInt(data.$skip))
        }

        if (data.$sort) {
          const sort = {}
          sort[data.$sort] = 1;
          execute = execute.sort(sort)
        }
        if (data.$sortdesc) {
          const sort = {}
          sort[data.$sortdesc] = -1;
          execute = execute.sort(sort)
        }
    
        return execute.toArray();
        // return execute.sort({ "time": -1 }).toArray();
      }).then(resolve).catch(errorHandler).finally(() => {
        db.close()
      })
    })
  },
  isExist: (city, date) => {
    return new Promise((resolve, reject) => {
      db.open(dataBase).then(dbo => {
        return dbo.collection('posts').find({ city, date }).limit(1).toArray()
      }).then(resolve).catch(errorHandler).finally(() => {
        db.close()
      })
    })
  }
}



router.get('/item/*', async (req, res) => {
  const entities = await dbAction.get({ _id: req.params[0] });

  if (entities.length) {
    const entity = entities[0];
    entity.id = entity._id
    res.status(200).json(entity);
  } else {
    res.status(404).send()
  }
  // res.send('<h1>success</h1>' + '<a href="logout">logout</a>');

});

router.get('/items/:city', async (req, res) => {
  const date = dayjs().format('YYYY-MM-DD');
  const allItems = await dbAction.get({ city: req.params.city, 
    date, 
    // '$limit': 20 
  })

  res.json(allItems);
})



router.get('/:type', async (req, res) => {
  const cityHeader = req.get('x-custom-header') || req.query.area;
  console.log('cityHeader:' + cityHeader);

  const city = getCityEntity(cityHeader); // TODO 适应客户端
  const cityIdentity = city.pinyin.toLowerCase()

  // 参数说明 https://newsapi.org/docs/endpoints/everything
  const date = dayjs().format('YYYY-MM-DD');
  const isExist = await dbAction.isExist(cityIdentity, date)
  let ids = [];
  if (!isExist.length) {
    const pageSize = 50;
    const params = {
      q: city.name,
      from: date, // 开始时间 ,默认当天
      // to: date, 结束时间
      sortBy: 'popularity',  //popularity热度最高的 relevancy和关键字最相似的  publishedAt和发布时间最靠近的
      language: 'zh',
      apiKey: 'c231663a04c94c96835da7ddbf7effeb',
      pageSize,// country
      page: 1
    }
    console.log(params);
    const { data } = await axios.get('https://newsapi.org/v2/everything', { params })
    const { ops } = await dbAction.post(data.articles, cityIdentity, date);
    // debugger;
    // ids = insertedIds;
    ops.forEach(a => ids.push(a._id.toString()))
    if (data.totalResults > pageSize) {
      const totalPages = Math.ceil(data.totalResults / pageSize);
      for (let index = 2; index <= totalPages; index++) {
        params.page = index;
        const news = await axios.get('https://newsapi.org/v2/everything', { params })
        const inserted = await dbAction.post(news.data.articles, cityIdentity, date);
        inserted.ops.forEach(a => ids.push(a._id.toString()))
      }
    }
  } else {
    const allIds = await dbAction.Ids(cityIdentity, date)
    ids = allIds.map(a => a._id)
  }
  // debugger;
  // console.log('top:' + JSON.stringify(ids));
  res.status(200).json(ids);
})

router.get('/content/:url', async () => {
  'http://url2api.applinzi.com/article?token=ZGy5_mzaT_Wy2EzRFBz4xA&url='
})

module.exports = router;
