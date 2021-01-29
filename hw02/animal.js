function populate() {
    var tbody = document.getElementById('powers');
    for (var i = 0; i < 8; i++){
      var row = document.createElement('tr');
      var x = document.createElement('td');
      var twotox = document.createElement('td');
      x.innerHTML = i;
      twotox.innerHTML = Math.pow(2, i);
      row.appendChild(x);
      row.appendChild(twotox);
      tbody.appendChild(row);
    }
}

populate();
