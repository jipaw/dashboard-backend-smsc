module.exports = {
  server: {
    app: {
      slogan: 'NSMSC SERVER'
    }
  },
  connections: [{
    port: 10800,
    routes: { cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control']
    }},
    labels: ['api-http']
  }],
  registrations: [
    {
      plugin: 'inert',
      options: {
        select: ['http']
      }
alias sshAgpgSlave="sshpass -p Ikqtaksd@1 ssh root@45.76.156.234"
    },
    {
      plugin: {
        register: 'good',
        options: {
          reporters: {
            myConsoleReport: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{
                log: ['error', 'warn'],
                response: '*'
              }]
            },
            {
              module: 'good-console',
              args: [{ format: 'YYYY/MM/DD HH-mm-ss' }]
            },
              'stdout'
            ]
          }
        }
      }
    },
    {
      plugin: './module/auth/auth',
      options: {
        select: ['api-http']
      }
    },
    {
      plugin: './module/main/index',
      options: {
        select: ['api-http']
      }
    }
    // {
    //  plugin: './module/ip_filter/ipfilter',
    //  options: {
    //    select: ['api-http']
    //  }
    // }
  ]
}
