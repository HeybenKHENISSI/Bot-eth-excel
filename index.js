const Discord = require('discord.js');
const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/3279b22e535e44a49fd6bc8cf6240bb1"))
const client = new Discord.Client();
const fs = require("fs");
const bdd = require("./bdd.json");
const { channel } = require("diagnostics_channel");
const XLSX = require('xlsx')
let request = require('request')
let seuil;
var workbook = XLSX.readFile("source.xlsx");
//var workbook = XLSX.readFile("https://docs.google.com/spreadsheets/d/1bfM8A35ZJYC-HeqdzxKoyK2h5spA7Ung/edit?usp=sharing&ouid=114649353554021586981&rtpof=true&sd=true");
var idcaptach;
//lol
var sheet_name_list = workbook.SheetNames;
console.log(sheet_name_list); // getting as Sheet1
const xlsxFile = require('read-excel-file/node');
let verif = 0;

client.on('ready', () => {
    console.log("go");
    seuil = bdd["seuil"]["niveau"];
    console.log("le seuil est " + seuil);

});

client.on("guildMemberAdd", member => {
    if (member.user.bot == false) {
        if (member.user.username.includes("Announcement") || member.user.username.includes("Admin") || member.user.username.includes("Moderator") || member.user.username.includes("Important") || member.user.username.includes("Mint") || member.user.username.includes("Minting") || member.user.username.includes("Administrator") || member.user.username.includes("Director") || member.user.username.includes("CEO") || member.user.username.includes("CTO") || member.user.username.includes("Manager") || member.user.username.includes("Announcements") || member.user.username.includes("Bot") || member.user.username.includes("Notification") || member.user.username.includes("Info") || member.user.username.includes("reminder") || member.user.username.includes("Annoucement") || member.user.username.includes("Information") || member.user.username.includes("Informations") || member.user.username.includes("annoucement") || member.user.username.includes("verification") || member.user.username.includes("annoucment") || member.user.username.includes("Annoucment") || member.user.username.includes("verification") || member.user.username.includes("Verification") || member.user.username.includes("mint") || member.user.username.includes("news") || member.user.username.includes("giveaway") || member.user.username.includes("giveaways") ||  member.user.username.includes("Presale") ||  member.user.username.includes("presale") ||  member.user.username.includes("PRESALE")) {
            console.log(member.user.username + " est ban car il possède un pseudon non conforme")
            member.guild.member(member.user.id).ban({ reason: 'ban' })
        }
    }
});

let passe = 0;
let mem;
const idserv = "317263352353128448";
const idrolewhitelist = "913150249747488788";
const idrolebest = "912793132729528330";
const idrolenul = "913858262888235068";
const idroleadmin = 'CEO Moody Ape';

client.on("message", async message => {
    let prefix = "!";
    let arg = message.content.trim().split(/ +/g)

    if (message.author.bot == false) {
        if (message.author.username.includes("Announcement") || message.author.username.includes("Admin") || message.author.username.includes("Moderator") || message.author.username.includes("Important") || message.author.username.includes("Mint") || message.author.username.includes("Minting") || message.author.username.includes("Administrator") || message.author.username.includes("Director") || message.author.username.includes("CEO") || message.author.username.includes("CTO") || message.author.username.includes("Manager") || message.author.username.includes("Announcements") || message.author.username.includes("Bot") || message.author.username.includes("Notification") || message.author.username.includes("Info") || message.author.username.includes("reminder") || message.author.username.includes("Annoucement") || message.author.username.includes("Information") || message.author.username.includes("Informations") || message.author.username.includes("annoucement") || message.author.username.includes("verification") || message.author.username.includes("annoucment") || message.author.username.includes("Annoucment") || message.author.username.includes("verification") || message.author.username.includes("Verification") || message.author.username.includes("mint") || message.author.username.includes("news") || message.author.username.includes("giveaway") || message.author.username.includes("giveaways") ||  message.author.username.includes("Presale") ||  message.author.username.includes("presale") ||  message.author.username.includes("PRESALE")) {
            //console.log(/*"est ban"*/"est" + member.user.username)
            console.log(message.author.username + " est ban car il possède un pseudon non conforme")
            message.guild.member(message.author.id).ban({ reason: 'ban' })
        }
    }

    if (message.channel.id == '922946613645836378') {
        if (message.member.user.bot) return;
        if (message.member.roles.cache.some(role => role.name === 'CEO Moody Ape')) {

            if (message.attachments) {
                message.attachments.forEach(a => {
                    download(a.url, message)
                });
            }
        }
    }
    if (message.content.startsWith(prefix + "seuil")) {
        if (message.member.roles.cache.some(role => role.name === idroleadmin)) {
            console.log("gyugu");
            try {
                let lol = parseFloat(arg[1]);
                if (!arg[1]) {
                    message.channel.send("Please enter an ETH threshold");
                }
                else if (lol >= 0 && lol <= 100000 && typeof (lol) === "number") {
                    console.log(lol);
                    console.log(typeof (lol));
                    console.log("vf");
                    seuil = lol;
                    message.channel.send("The ETH threshold has been changed to " + arg[1]);
                    bdd["seuil"] = { "niveau": lol }
                    Savebdd();
                }
                else {
                    console.log(lol);
                    console.log(typeof (lol));
                    message.channel.send("invalid threshold");
                }
            } catch (error) {
                message.channel.send("The threshold is invalid");
            }
        }
    }
    else if (message.content.startsWith(prefix + "upload")) {
        if (message.member.roles.cache.some(role => role.name === 'CEO Moody Ape')) {
            if (verif === 0) {
                xlsxFile('source.xlsx').then((rows) => {
                    let s = 0;
                    rows.forEach((col) => {
                        let nomm;
                        let ad;
                        let etth;
                        let x = 0;
                        if (s > 0) {
                            col.forEach((data) => {
                                if (x == 0) {
                                    nomm = data;
                                }
                                if (x == 1) {
                                    ad = data;
                                }
                                if (x == 2) {
                                    etth = data;
                                }
                                x++;
                                //console.log(data);
                                //console.log(typeof data);
                            })

                            bdd["liste"][nomm] = { "pseudo": nomm, "adresse": ad, "ETH": etth }
                        }
                        s++;
                    })
                    Savebdd();

                })
            }
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
            // verif = 1;
            console.log(verif);

            chaint(message);

            message.channel.send("step " + verif + "/3");
            console.log(verif + "lol")
            /* if(verif ==3){
                 for (var nom_clee in bdd["liste"]) {
                     delete bdd["liste"][nom_clee];
                     Savebdd();
                     console.log(nom_clee)
                 }
                 //Savebdd();
             }*/
        }
    }

})

function chaint(message) {
    console.log("passe");
    let student = [];
    //const sheets = file.SheetNames;
    // console.log(bdd["liste"][1]["pseudo"] + " a " + bdd["liste"][1]["ETH"] + "ETH");
    console.log("passe11");

    for (var nom_clee in bdd["liste"]) {
        console.log("passe2");
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        //message.channel.send(bdd["liste"][nom_clee]["pseudo"] + " ancien solde : " + bdd["liste"][nom_clee]["ETH"]);
        scan(bdd["liste"][nom_clee]["adresse"], bdd["liste"][nom_clee]["pseudo"], message, 0);
        // message.channel.send(bdd["liste"][nom_clee]["pseudo"] + " nouveau solde : " + bdd["liste"][nom_clee]["ETH"]);
        seuil = bdd["seuil"]["niveau"];
        //if (verif >= 2) {
        if (bdd["liste"][nom_clee]["ETH"] < seuil) {

            if (verif >= 2) {
                message.channel.send(bdd["liste"][nom_clee]["pseudo"] + " n'a pas assez d'ETH (" + bdd["liste"][nom_clee]["ETH"] + "), il est retiré de la white list");
            }
            console.log(bdd["liste"][nom_clee]["pseudo"] + " n'a pas assez d'ETH (" + bdd["liste"][nom_clee]["ETH"] + ")");
        }
        //  }
        else {
            student.push({ name: bdd["liste"][nom_clee]["pseudo"], adresse: bdd["liste"][nom_clee]["adresse"], eth: bdd["liste"][nom_clee]["ETH"] })
            if (verif >= 2) {
                message.channel.send(bdd["liste"][nom_clee]["pseudo"] + " a assez d'ETH (" + bdd["liste"][nom_clee]["ETH"] + ")");
            }
            console.log(bdd["liste"][nom_clee]["pseudo"] + " a assez d'ETH (" + bdd["liste"][nom_clee]["ETH"] + ")");
            //  }
        }
        //console.log(nom_clee);

    }
    verif++;
    console.log(verif);
    if (verif === 3) {
        const convertJsonToExcel = () => {

            const workSheet = XLSX.utils.json_to_sheet(student);
            const workBook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(workBook, workSheet, "student")
            // Generate buffer
            XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })

            // Binary string
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

            XLSX.writeFile(workBook, "Whitelist.xlsx")

        }
        convertJsonToExcel()
        message.channel.send("Testing message.", { files: ["./Whitelist.xlsx"] });


        // delete bdd["liste"];
        //Savebdd();
        verif = 0;
    }

}

function download(url, message) {
    var ext2 = request.get(url).path.split("/").pop()
    if (ext2 == 'source.xlsx') {
        verif = 0;

        /*  var counter = 0;
          fs.readdirSync("./").forEach(file => {
              counter++
          })
          counter++;
          console.log(ext2)
          var ext = request.get(url).path.split(".").pop()
          console.log(ext)*/
        request.get(url)
            .on('error', console.error)
            .pipe(fs.createWriteStream(`./source.xlsx`));
        // imagebdd.push(`${counter}.${ext}`)
        //SaveImage();
        message.channel.send(`fichier ajoutée avec succès !`).then(message => message.delete({ timeout: 10000 }).catch(err => console.log(err)))
        for (var nom_clee in bdd["liste"]) {
            delete bdd["liste"][nom_clee];
            console.log(nom_clee)
        }
        Savebdd();

    }
}

function scan(portefeuille, nom, ll, a) {
    console.log("hiuhiuiuhiuhiuiuhiuhiuiuhiuhiuiuhiuhiuiuhiuhiuiuhiuhiuiuhiuhiuiuhiuhiuiuhiuhiuiuhiuhiuiu");
    try {
        web3.eth.getBalance(portefeuille, function (err, result) {

            if (err) {
                console.log(err)
            } else {
                console.log(web3.utils.fromWei(result, "ether") + " ETH");
                let iiii = web3.utils.fromWei(result, "ether")
                console.log(iiii)
                bdd["liste"][nom] = { "pseudo": nom, "adresse": portefeuille, "ETH": iiii }
                if (a === 1) {
                    ll.channel.send("tu a " + iiii + " ETH, ton portefeuille à été enregistré");
                }
                else {

                    // ll.channel.send("ppp");
                }
                Savebdd();
                return result;
            }
        })
    } catch (error) {
        //console.error(error);
        ll.channel.send("Le portefeuille que tu a renseigner n'existe pas");
    }
}



function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
}
client.login(process.env.token);
