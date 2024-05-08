function reactHandler() {
    return Object.values(document.querySelector('#app>div>div'))[1].children[0]._owner
}
var j = 0;
var rx = false;
var hi = false;
document.addEventListener("keydown", function(e) {
    if (e.key === "`") {
        hi = !hi;
        c.style.display = hi ? "block" : "none";
    }
});

function parseCmd(t) {
    if (t.charAt(0) === "/") {
        var c = t.split(" ");
        var cm = c[0].replace("/", "");
        c.splice(0, 1);
        return {
            cmd: cm,
            args: c
        };
    } else {
        return false;
    }
}

function setstate(args) {
    var t = {};
    args.forEach(e => {
        var p = e.split(":");
        if (!Number.isNaN(parseInt(p[1]))) {
            if (parseInt(p[1]).toString() === p[1]) {
                p[1] = parseInt(p[1]);
            }
        }
        t[p[0]] = p[1];
    });
    reactHandler().stateNode.setState(t);
    a("Set Successful!");
}

function setv(args) {
    reactHandler().stateNode.props.liveGameController.setVal({
        path: "c/" + reactHandler().stateNode.props.client.name + "/" + args[0],
        val: args.slice(1, args.length).join(" ")
    });
}

function tsvlog() {
    window.logsv = !window.logsv;
    a("SetVal log set to " + (window.logsv ? "Enabled" : "Disabled"));
}

function dumpstate() {
    Object.keys(reactHandler().stateNode.state).map(e => {
        var obj = reactHandler().stateNode.state[e];
        if (obj != null) {
            if (Array.from(obj) && typeof obj === "object") {
                obj = "[Array]";
            }
            a(e + ":" + obj);
        } else {
            return "N/A";
        }
    }).join(";");
}

function setBlook(b) {
    var blooks = webpackJsonp.push([
        [], {
            ['1234']: (_, a, b) => {
                a.webpack = b
            }
        },
        [
            ['1234']
        ]
    ]).webpack("MDrD").a;
    b = Object.keys(blooks).find(e => b.toLocaleLowerCase() === e.toLocaleLowerCase());
    if (blooks[b]) {
        a("Setting blook to " + b + "!");
        reactHandler().stateNode.props.liveGameController.setVal({
            id: reactHandler().stateNode.props.client.hostId,
            path: "c/" + reactHandler().stateNode.props.client.name,
            val: {
                b: b
            }
        });
        reactHandler().stateNode.props.client.blook = b;
    } else {
        a("No blook with that name was found!");
    }
}

function unlockBlook(b) {
    var blooks = webpackJsonp.push([
        [], {
            ['1234']: (_, a, b) => {
                a.webpack = b
            }
        },
        [
            ['1234']
        ]
    ]).webpack("MDrD").a;
    b = Object.keys(blooks).find(e => b.toLocaleLowerCase() === e.toLocaleLowerCase());
    if (blooks[b]) {
        reactHandler().stateNode.state.unlocks.push(b);
        reactHandler().stateNode.forceUpdate();
    } else {
        a("No blook with that name was found!");
    }
}

function list() {
    reactHandler().stateNode.props.liveGameController.getDatabaseVal("c").then(e => {
        a("Current Players(" + Object.keys(e).length + "): " + Object.keys(e).join(","));
    });
}

function flist(p) {
    reactHandler().stateNode.props.liveGameController.getDatabaseVal("c/" + p).then(e => {
        if (e != null) {
            a("Dump: " + JSON.stringify(e));
        } else {
            a("Player not found!");
        }
    });
}

function sendMessage(e) {
    var t = parseCmd(e);
    if (t) {
        switch (t.cmd) {
            case "cb":
                setBlook(t.args.join(" "));
                break;
            case "clear":
                b.innerHTML = "";
                break;
            case "dumpstate":
                dumpstate();
                break;
            case "list":
                list();
                break;
            case "tlog":
                tsvlog();
                break;
            case "setval":
                setv(t.args);
                break;
            case "setstate":
                setstate(t.args);
                break;
            case "ahelp":
                a("Advanced Commands: setval(sets val logged by tlog ex /setval b Chicken), tlog(toggles setval log), dumpstate(dumps react state),setstate(sets react state /setstate crypto:5 crypto2:5 etc)");
                break;
            case "help":
                a("Available Commands: help(gives help),ahelp(advanced commands help), cb(changes blook /cb cow), list(lists players connected), dump(dumps all available info about a player, passwords, etc(/dump player)), clear(clears chat), code(gives game code), unlock(unlocks blook on lobby screen)");
                break;
            case "dump":
                flist(t.args.join(" "));
                break;
            case "unlock":
                unlockBlook(t.args.join(" "));
                break;
            case "code":
                a("Game Code: " + reactHandler().stateNode.props.client.hostId);
                break;
            default:
                a("Unrecognized chat command!");
                break;
        }
    } else {
        reactHandler().stateNode.props.liveGameController.setVal({
            id: reactHandler().stateNode.props.client.hostId,
            path: "c/" + reactHandler().stateNode.props.client.name + "/msg",
            val: {
                i: j,
                msg: e
            }
        }), j++;
    }
}
const c = document.createElement("div");
c.className = "chat-box", document.body.appendChild(c);
const h = document.createElement("div");
h.className = "chat-header", h.textContent = "Chat", c.appendChild(h);
const b = document.createElement("div");
b.className = "chat-body", c.appendChild(b);
const i = document.createElement("input");

function a(e) {
    const t = document.createElement("div");
    t.textContent = e, b.appendChild(t)
}
i.type = "text", i.className = "chat-input", i.placeholder = "Type a message...", c.appendChild(i), c.style.position = "fixed", c.style.bottom = "20px", c.style.right = "20px", c.style.width = "300px", c.style.backgroundColor = "#fff", c.style.border = "1px solid #ccc", c.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)", h.addEventListener("click", (() => {
    b.classList.toggle("open")
})), i.addEventListener("keydown", (function(e) {
    13 === e.keyCode && (sendMessage(e.srcElement.value), e.srcElement.value = "")
}));
var da = reactHandler().stateNode.props.liveGameController._liveApp.database()._delegate._repoInternal.server_.onDataUpdate_;

function handleChat(e, t) {
    if (t != null) {
        if(e.includes("/msg")){
        t?.msg && (console.log(t.msg), a(e.split("/")[2] + ": " + t.msg))
}
    }
}
reactHandler().stateNode.props.liveGameController._liveApp.database()._delegate._repoInternal.server_.onDataUpdate_ = function(e, t, a, n) {
    console.log(e, t, a, n), handleChat(e, t), da(e, t, a, n)
};
window.logsv = false;

function onsv(e) {
    if (window.logsv) {
        a("Path: " + e.path.split("/").splice(2, 2).join("/") + " Val: " + ((typeof e.val === 'object') ? JSON.stringify(e.val) : e.val));
    }
}
var orgsv = reactHandler().stateNode.props.liveGameController.setVal;
reactHandler().stateNode.props.liveGameController.setVal = function() {
    onsv.apply(this, arguments);
    orgsv.apply(this, arguments);
};
reactHandler().stateNode.props.liveGameController._liveApp.database().ref(`${reactHandler().stateNode.props.liveGameController._liveGameCode}`).on("value",e=>{});
a("Lobbychat successfully loaded!");

function app() {
    c.style.wordWrap = "break-word";
}
app();
