// 🚗 VEHICLE ENTRY
async function entry() {
    let vnum = document.getElementById('vnum').value;
    let hour = document.getElementById('hour').value;
    let min = document.getElementById('min').value;

    if (!vnum || hour === "" || min === "") {
        alert("Please fill all fields");
        return;
    }

    let res = await fetch('/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vnum, hour, min })
    });

    let data = await res.json();
    alert(data.message);
}


// 🚙 VEHICLE EXIT
async function exitVehicle() {
    let vnum = document.getElementById('exitVnum').value;
    let hour = document.getElementById('exitHour').value;
    let min = document.getElementById('exitMin').value;

    if (!vnum || hour === "" || min === "") {
        alert("Please fill all fields");
        return;
    }

    let res = await fetch('/exit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vnum, hour, min })
    });

    let data = await res.json();

    if (data.message) {
        alert(data.message);
    } else {
        alert(
            "Parking Time: " + data.parkingTime +
            "\nFee: " + data.fee +
            (data.nextVehicle ? "\nNext Vehicle: " + data.nextVehicle : "")
        );
    }
}


// 📊 DISPLAY PARKING STATUS
async function display() {
    let res = await fetch('/display');
    let data = await res.json();

    let output = "";

    data.slots.forEach(line => {
        output += line + "\n";
    });

    output += "\nWaiting Queue: ";

    if (data.queue.length === 0) {
        output += "Empty";
    } else {
        output += data.queue.join(", ");
    }

    document.getElementById('output').innerText = output;
}


// 🔄 AUTO REFRESH STATUS (every 5 sec)
setInterval(display, 5000);
