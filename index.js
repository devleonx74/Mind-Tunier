const enmap = require("enmap")
const Discord = require("discord.js")
const canvacord = require("canvacord");
const Canvas = require("canvas");
const Collection = require('discord.js')
const client = new Discord.Client({
  //fetchAllMembers: false,
  //restTimeOffset: 0,
  //restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: [ ],
    repliedUser: false,
  },
//  ws: { properties: { $browser: "Discord iOS" }},
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [ 
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MEMBERS,
      //Discord.Intents.FLAGS.GUILD_BANS,
      //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
      //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
      //Discord.Intents.FLAGS.GUILD_INVITES,
     // Discord.Intents.FLAGS.GUILD_VOICE_STATES,
  //    Discord.Intents.FLAGS.GUILD_PRESENCES,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
      //Discord.Intents.FLAGS.DIRECT_MESSAGES,
      //Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
})
//<====functions=====>
client.db = new enmap({name: "database"})


const { QuickDB } = require('quick.db');
const db = new QuickDB();
//<====functions=====>

//<====COMMANDS=====>



const Style = {
  error: "\x1b[31m\x1b",
  warning: "\x1b[33m\x1b",
  success: "\x1b[32m\x1b"
}

client.config = require("./config.json")
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
const fs = require('fs')
const { MessageEmbed, MessageActionRow, MessageButton , MessageSelectMenu} = require("discord.js");

  const config = require("./config.json")







  

  client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return
    const prefix = config.prefix
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
      return message.channel.send({
        content: `${ee.false} **| You are** **__NO__** **in a Voice Channel**`,
        components: [invitebutton]

      })
    }
    try {
      cmd.run(client, message, args)
    } catch (e) {
      console.error('ERR + Run the cmd')
    }
  })



  
  const { readdirSync } = require(`fs`);

      let amount = 0 
fs.readdirSync("./commands/").forEach((dir) => {
    const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"))
    for (let file of commands) {
        let pull = require(`./commands/${dir}/${file}`)
        if (pull.name) {
            client.commands.set(pull.name, pull)
            amount++;
        } else {
            console(file + " ==> * ERR")
            continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name))
    }
})
console.log(amount + ' COMMANDS LOADED')
  
  
  
      client.on('ready', () => {
        console.log(Style.success,`Log in ${client.user.username}....`)
        let statuse = [`16.8.2022 😭 😢`]
  
        setInterval(() => {
         let rstatus = statuse[Math.floor(Math.random() * statuse.length)]
  
         client.user.setActivity(rstatus,{type: "LISTENING"})
        }, 5000);
      })

      client.on("interaction", async(interaction) => {
        if(!interaction.isButton()) return
        if(interaction.customId == "verifyroleadd") {
          if(interaction.message.partial) await interaction.message.fetch();
            if(interaction.partial) await interaction.fetch();
            if(!interaction.message.guild) return;
            
            const role = await interaction.guild.roles.fetch(`999278259353178152`);
            if (interaction.member.roles.cache.has('999278259353178152')) {
                interaction.reply({ content: `**__Du hast dich schon für das Turnier Verifiziert__** 🎮`, ephemeral: true });
       
            } else {
           
              db.add(`player_${interaction.guild.id}`, 1)
              let data = await db.get(`player_${interaction.guild.id}`)
              interaction.reply({ content: `**__Erfolgreich Verifiziert__** ✅`, ephemeral: true });
              interaction.member.roles.add('999278259353178152')
              const channel = interaction.guild.channels.cache.get('999276784451334160')
              
              channel.send({ embeds: [new MessageEmbed()
                .setDescription(`**Turnier Logs! ✅**

                *Spieler:* \`${interaction.user.username}\` **|** ${interaction.user}

                *Verifizierte Spieler:* \`${data}\`

    

                        `)
                        .setFooter({
                            text: client.user.username,
                            iconURL: client.user.avatarURL()
                        })
                    .setThumbnail(client.user.avatarURL())
                    .setColor('DARK_BLUE')
                    .setTimestamp()
              ] })

            }
            
        }})

        client.on("interaction", async(interaction) => {
          if(!interaction.isButton()) return
          if(interaction.customId == "Turnier") {
            if(interaction.message.partial) await interaction.message.fetch();
              if(interaction.partial) await interaction.fetch();
              if(!interaction.message.guild) return;

              const data = client.db.get(interaction.guild.id)

              interaction.reply({ content: `**Der Custom Games code lautet: \`${data.code}\`** 🎮`, ephemeral:true })

          }})

  client.login(config.token)
  

  
   
  
        //<========================================ENDE======================================>//
        /** 
        process.on('unhandledRejection', (reason, p) => {
          console.log('[antiCrash]');
          console.log(reason, p);
      });
      process.on("uncaughtException", (err, origin) => {
        console.log('[antiCrash]');
          console.log(err, origin);
      }) 
      process.on('uncaughtExceptionMonitor', (err, origin) => {
          console.log('[antiCrash]');
          console.log(err, origin);
      });
      process.on('multipleResolves', (type, promise, reason) => {
          //console.log(' [antiCrash] :: Multiple Resolves');
          //console.log(type, promise, reason);
      });  
      */