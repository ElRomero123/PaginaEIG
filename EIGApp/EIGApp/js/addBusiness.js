window.onload = initUser;

function initUser()
{

    var name     = localStorage.getItem('Name');
    var username = localStorage.getItem('Username');
    var kind     = localStorage.getItem('KindPackage');

    alert(kind);
    
    if(name != null)
    {
        if(kind == false)
        {
            $('#infoName').text(name);
            $('#infoUsername').text(username);
        }

        else
        {
            location.href = 'addProduct.html';
        }
    }

    else
    {
        location.href = 'index.html';
    }
}