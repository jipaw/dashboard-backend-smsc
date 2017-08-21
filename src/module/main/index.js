const Path = require('path')
const Knex = require('../../../config/knex')
const moment = require('moment')
const Wreck = require('wreck')
const Boom = require('boom')
const appVar = require('../../../config/app_var')
const Joi = require('joi')

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/setting/main',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          const data = {
            autoProcess: appVar.autoResend,
            autoResend: appVar.autoResend,
            maintenanceMode: appVar.maintenanceMode,
            passthroughMode: appVar.passthroughMode
          }
          reply(data).code(200)
        },
        validate: {
        }
      }
    },
    {
      method: 'POST',
      path: '/setting/main',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          const {autoProcess, autoResend, maintenanceMode, passthroughMode} = request.payload
          appVar.autoProcess = autoProcess
          appVar.autoResend = autoResend
          appVar.maintenanceMode = maintenanceMode
          appVar.passthroughMode = passthroughMode
          reply().code(200)
        },
        validate: {
          payload: {
            autoProcess: Joi.boolean().required(),
            autoResend: Joi.boolean().required(),
            maintenanceMode: Joi.boolean().required(),
            passthroughMode: Joi.boolean().required()
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/setting/trx',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          const data = {
            processInterval: appVar.heartbeatProcess,
            resendInterval: appVar.heartbeatResend,
            limitProcess: appVar.limitProcess,
            maxResend: appVar.maxResend
          }
          reply(data).code(200)
        },
        validate: {
        }
      }
    },
    {
      method: 'POST',
      path: '/setting/trx',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          const {processInterval, resendInterval, limitProcess, maxResend} = request.payload
          appVar.heartbeatProcess = processInterval
          appVar.heartbeatResend = resendInterval
          appVar.limitProcess = limitProcess
          appVar.maxResend = maxResend
          reply().code(200)
        },
        validate: {
          payload: {
            processInterval: Joi.number().integer().min(5).max(60).required(),
            resendInterval: Joi.number().integer().min(5).max(60).required(),
            limitProcess: Joi.number().integer().min(1).max(10).required(),
            maxResend: Joi.number().integer().min(1).max(2).required()
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/smsc/status',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          const {msisdn, sender} = request.payload
          const req = {
            msisdn: msisdn,
            sender: sender
          }
          const method = 'POST'
          const baseUrl = 'http://127.0.0.1:2124'
          const uri = '/smsc/status'
          const options = {
            baseUrl: baseUrl,
            payload: JSON.stringify(req),
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 10000
          }
          Wreck.request(method, uri, options, (e, res) => {
            if (e) console.log(e)
            Wreck.read(res, null, (e, body) => {
              if (e) console.log(e)
              console.log(body.toString())
              reply().code(200)
            })
          })
        },
        validate: {
          payload: {
            msisdn: Joi.string().regex(/^((?:\+62|62)|0)[2-9]{1}[0-9]+$/).required(),
            sender: Joi.string().max(10)
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/sms/autoProcess',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          appVar.autoProcess = request.payload.autoProcess
          console.log('[LOG SETTING] Auto process setting |', appVar.autoProcess.toString().toUpperCase())
          reply().code(200)
        },
        validate: {
          payload: {
            autoProcess: Joi.boolean().required()
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/sms/autoResend',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          appVar.autoResend = request.payload.autoResend
          console.log('[LOG SETTING] Auto resend setting |', appVar.autoProcess.toString().toUpperCase())
          reply().code(200)
        },
        validate: {
          payload: {
            autoResend: Joi.boolean().required()
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/sms/maintenanceMode',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          appVar.maintenanceMode = request.payload.maintenanceMode
          reply().code(200)
        },
        validate: {
          payload: {
            maintenanceMode: Joi.boolean().required()
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/sms/passthroughMode',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          console.log(request.payload)
          appVar.passthroughMode = request.payload.passthroughMode
          reply().code(200)
        },
        validate: {
          payload: {
            passthroughMode: Joi.boolean().required()
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/sms/processInterval',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          appVar.heartbeatProcess = request.payload.heartbeatProcess
          reply().code(200)
        },
        validate: {
          payload: {
            processInterval: Joi.number().integer().min(5).max(60).required()
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/sms/resendInterval',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          appVar.heartbeatResend = request.payload.heartbeatResend
          reply().code(200)
        },
        validate: {
          payload: {
            resendInterval: Joi.number().integer().min(5).max(60).required()
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/sms/limitProcess',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          appVar.limitProcess = request.payload.limitProcess
          reply().code(200)
        },
        validate: {
          payload: {
            limitProcess: Joi.number().integer().min(1).max(10).required()
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/sms/maxResend',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          appVar.maxResend = request.payload.maxResend
          reply().code(200)
        },
        validate: {
          payload: {
            maxResend: Joi.number().integer().min(1).max(2).required()
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/sms/resendId',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          const {in_stat, trx_id, user_name, destination} = request.payload
          Knex('in_http_read').returning('in_seq').where({
            user_name: user_name,
            in_stat: in_stat,
            trx_id: trx_id,
            destination: destination
          }).update({
            in_stat: 6,
            flag: 'Resend'
          }).then((result) => {
            console.log(result)
            reply().code(200)
          }).catch((e) => reply().code(400))
        },
        validate: {
          // payload: appVarSchema
        }
      }
    },
    {
      method: 'POST',
      path: '/sms/setFailed',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          const {in_stat, trx_id, user_name, destination} = request.payload
          // knex.raw('INSERT INTO in_http_read (user_name, destination, message, trx_id, reference, chip_sender, in_stat, flag) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [username, destination, message, trxid, 'Failed', chip_sender, 4, 'BadNumber']).asCallback((e, result) => {
          //   if (e) return console.error(e)
          //   let n = result[0].affectedRows
          //   if (n > 0) {
          //     knex.table('inbox_http').where('in_stat', 0).andWhere('destination', destination).andWhere('trx_id', trx_id).limit(n).del().then(function (result) {
          //       return result
          //     })
          //   }
          // })
          Knex('inbox_http').returning('in_seq').where({
            user_name: user_name,
            in_stat: in_stat,
            trx_id: trx_id,
            destination: destination
          }).update({
            in_stat: 5,
            flag: 'Failed'
          }).then((result) => {
            console.log(result)
            reply().code(200)
          }).catch((e) => reply().code(400))
        },
        validate: {
          // payload: appVarSchema
        }
      }
    },
    {
      method: 'POST',
      path: '/sms/setDelete',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
          // console.log(request.payload)
          const {in_stat, trx_id, user_name, destination} = request.payload
          Knex('in_http_read').returning('in_seq').where({
            user_name: user_name,
            in_stat: in_stat,
            trx_id: trx_id,
            destination: destination
          }).update({
            in_stat: 7,
            reference: 'Failed',
            flag: 'ResendFail'
          }).then((result) => {
            console.log(result)
            reply().code(200)
          }).catch((e) => reply().code(400))
        },
        validate: {
          // payload: appVarSchema
        }
      }
    },
    {
      method: 'GET',
      config: {
        auth: 'jwt'
      },
      path: '/dashboard',
      handler: (request, reply) => {
        let startDate = moment().format('YYYY-MM-DD') + ' 00:00:00'
        let endDate = moment().format('YYYY-MM-DD HH:mm:ss')
        // Knex('inbox_http').count('in_seq as total').where('in_stat', '=', 2).andWhereBetween('in_time', [startDate, endDate]).then(([result]) => {
        //   var queue = result.total
        Knex.raw('SELECT COUNT(in_seq) as totalIn, COUNT(IF(in_stat= ? ,1,null)) AS inboxNew, COUNT(IF(in_stat= ? ,1,null)) as process, COUNT(IF(in_stat= ? ,1,null)) as stale FROM inbox_http WHERE in_time BETWEEN ? AND ?', [0, 2, 5, startDate, endDate]).then(([result]) => {
          const {totalIn, inboxNew, process, stale} = result[0]
          Knex.raw('SELECT COUNT(in_seq) as request, COUNT(IF(in_stat= ? ,1,null)) AS pendingProcess, COUNT(IF(in_stat= ? ,1,null)) as success, COUNT(IF(in_stat= ? ,1,null)) as pendingResend, COUNT(IF(in_stat= ? ,1,null)) as failed FROM in_http_read WHERE in_time BETWEEN ? AND ?', [2, 4, 5, 7, startDate, endDate]).then(([result]) => {
            const data = {
              title: 'Dashboard Page',
              username: request.auth.credentials.username,
              sms_request: result[0].request + totalIn,
              sms_queue_in: inboxNew,
              sms_process: result[0].pendingProcess + process + stale,
              sms_sent: result[0].success,
              sms_resend_in: result[0].pendingResend,
              sms_failed: result[0].failed
            }
            console.log(data)
            return reply(data)
          }).catch((e) => {
            reply(Boom.gatewayTimeout())
          })
          return null
        }).catch((e) => console.error(e))
      }
    },
    {
      method: 'GET',
      config: {
        auth: 'jwt'
      },
      path: '/sms-failed',
      handler: (request, reply) => {
      // console.log(request.query)
        Knex('in_http_read').where('in_stat', 5).select('*').then((result) => {
          let obJResp = []
          for (var i = 0; i < result.length; ++i) {
            let data = {
              user_name: result[i].user_name,
              in_time: moment(result[i].in_time).format('YYYY-MM-DD HH:mm:ss'),
              destination: result[i].destination,
              message: result[i].message,
              trx_id: result[i].trx_id,
              flag: result[i].flag,
              in_stat: result[i].in_stat,
              chip_sender: result[i].chip_sender
            }
            obJResp.push(data)
          }
          reply(obJResp)
        })
      }
    },
    {
      method: 'GET',
      config: {
        auth: 'jwt'
      },
      path: '/sms-queue',
      handler: (request, reply) => {
      // console.log(request.query)
        Knex('inbox_http').where('in_stat', 0).orWhere('in_stat', 6).select('*').then((result) => {
          let obJResp = []
          for (var i = 0; i < result.length; ++i) {
            let data = {
              user_name: result[i].user_name,
              in_time: moment(result[i].in_time).format('YYYY-MM-DD HH:mm:ss'),
              destination: result[i].destination,
              message: result[i].message,
              trx_id: result[i].trx_id,
              flag: result[i].flag,
              in_stat: result[i].in_stat,
              chip_sender: result[i].chip_sender
            }
            obJResp.push(data)
          }
          reply(obJResp)
        })
      }
    },
    {
      method: 'GET',
      config: {
        auth: 'jwt'
      },
      path: '/users',
      handler: (request, reply) => {
      // console.log(request.query)
        Knex('users').select('*').then((result) => {
          let obJResp = []
          for (var i = 0; i < result.length; ++i) {
            let data = {
              id: i + 1,
              username: result[i].username,
              name: result[i].name,
              uuid: result[i].uuid,
              type: result[i].type,
              token: result[i].token,
              registration_date: result[i].registration_date
            }
            obJResp.push(data)
          }
          console.log(obJResp)
          return reply(obJResp)
        })
      }
    },
    {
      method: 'GET',
      config: {
        auth: 'jwt'
      },
      path: '/smsc',
      handler: (request, reply) => {
      // console.log(request.query)
        Knex('sender').select('*').then((result) => {
          reply(result)
        })
      }
    },
    {
      method: 'GET',
      config: {
        auth: 'jwt'
      },
      path: '/inboxes/log',
      handler: (request, reply) => {
        console.log(request.payload)
        Knex('sms_in').orderBy('id', 'desc').limit(20).select('*').asCallback((e, result) => {
          if (e) console.log(e)
          console.log(result)
          return reply(result)
        })
      }
    },
    {
      method: 'PUT',
      config: {
        auth: 'jwt'
      },
      path: '/smsc',
      handler: (request, reply) => {
        console.log(request.payload)
        const { in_seq, id, port, msidn, prefix, token, delay, status, active } = request.payload
        Knex('sender').where('in_seq', in_seq).update({
          id: id,
          port: port,
          msidn: msidn,
          prefix: prefix,
          token: token,
          delay: delay,
          status: status,
          active: active
        }).asCallback((e, result) => {
          if (e) console.log(e)
          console.log(result)
          return reply(result)
        })
      }
    },
    {
      method: 'POST',
      config: {
        auth: 'jwt'
      },
      path: '/sms/bulk',
      handler: (request, reply) => {
        console.log(request.payload)
        const {limit} = request.payload
        Knex('in_http_read').where('in_stat', 5).orderBy('in_seq').limit(limit).update({
          in_stat: 6,
          flag: 'Resend'
        }).asCallback((e, result) => {
          if (e) console.log('[LOG ERROR] Query bulk sms failed', e)
          reply(result)
        })
      }
    },
    {
      method: 'POST',
      config: {
        auth: 'jwt'
      },
      path: '/resend',
      handler: (request, reply) => {
        console.log(request.payload)
        const { user_name, in_time, destination, message, trx_id, reference, in_stat, chip_sender } = request.payload.data

        Wreck.post('http://127.0.0.1:2124/sms/resend',
          {
            payload: {
              user_name: user_name,
              in_time: in_time,
              destination: destination,
              message: message,
              trx_id: trx_id,
              reference: reference,
              in_stat: in_stat,
              chip_sender: chip_sender
            }
          }, (err, res, payload) => {
            if (err) { console.log(err) }
            console.log(res)
          })
      }
    },
    {
      method: 'POST',
      config: {
        auth: 'jwt'
      },
      path: '/user',
      handler: (request, reply) => {
      // console.log(request.payload)
        const { username, password, name, token } = request.payload
        const uuid = 'NULL'
        Knex('users').returning('uuid').insert({
          username: username,
          password: password,
          name: name,
          uuid: uuid,
          token: token,
          registration_date: moment().format('YYYY-MM-DD')
        }).then((user) => {
          console.log(user)
          reply(user)
        }).catch((err) => {
          console.error(err)
        })
      }
    },
    {
      method: 'GET',
      config: {
        auth: 'jwt'
      },
      path: '/user',
      handler: (request, reply) => {
      // console.log(request.payload)
        Knex('users').select('*').then((user) => {
          console.log(user)
          reply(user)
        }).catch((err) => {
          console.error(err)
        })
      }
    },
    {
      method: 'GET',
      config: {
        auth: 'jwt'
      },
      path: '/user/{name}',
      handler: (request, reply) => {
      // console.log(request.payload)
        Knex('users').where('user_name', request.query.username).select('*').then(([user]) => {
          console.log(user)
          reply(user)
        }).then((err) => {
          console.err(err)
        })
      }
    },
    {
      method: 'POST',
      path: '/sms/replaceWord',
      config: {
        description: 'Routes for handle send sms',
        handler: function (request, reply) {
        // console.log(request.payload)
          appVar.wordReplace = request.payload.wordReplace
          appVar.word = request.payload.word
          appVar.pattern = request.payload.pattern
          reply().code(200)
        // const method = 'POST'
        // const uri = '/sms/replaceWord'
        // const options = {
        //   baseUrl: 'http://127.0.0.1:2124',
        //   payload: request.payload
        // }
        // Wreck.request(method, uri, options, (e, res) => {
        //   if (e) reply().code(500)
        //   Wreck.read(res, null, (e, body) => {
        //     if (e) console.log(e)
        //     // console.log(body.toString())
        //   })
        //   reply().code(200)
        // })
        },
        validate: {
        // payload: appVarSchema
        }
      }
    },
    {
      method: 'GET',
      config: {
        auth: 'jwt'
      },
      path: '/provider/logs',
      handler: (request, reply) => {
        Knex('log_provider').select('*').orderBy('log_time', 'desc').limit(20).asCallback((e, result) => {
          if (e) return console.log('[LOG ERROR] Error get log message', e)
          // console.log(result)
          reply(result)
        })
      }
    },
    {
      method: 'GET',
      path: '/assets/{param*}',
      config: {
        description: 'Catch all route',
        auth: false,
        handler: {
          directory: {
            path: Path.join(__dirname, '../../../public/assets/'),
            listing: false,
            index: true
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/{p*}',
      config: {
        description: 'Catch all route',
        auth: false,
        handler: function (request, reply) {
          reply.file(Path.join(__dirname, '../../../public/index.html'))
        }
      }
    }
  ])

  return next()
}

exports.register.attributes = {
  name: 'ip-sms route',
  version: '1.0.1'
}
