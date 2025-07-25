document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        fetch('/add', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(() => window.location.href = '/')
        .catch(error => console.error('Error:', error));
    });

    function refreshTable() {
        fetch('/api/inventory')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#inventoryTable tbody');
            tbody.innerHTML = '';
            data.forEach(item => {
                const row = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.quantity}</td><td><a href="/update/${item.id}">Update</a><a href="/delete/${item.id}" onclick="return confirm('Are you sure?')">Delete</a></td></tr>`;
                tbody.innerHTML += row;
            });
        });
    }
    setInterval(refreshTable, 5000);
});
