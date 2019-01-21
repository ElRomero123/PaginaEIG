window.onload = initUser;

function initUser()
{

    var name     = localStorage.getItem('Name');
    var username = localStorage.getItem('Username');
    var kind     = localStorage.getItem('KindPackage');
    
    if(name != null)
    {
        if(kind)
        {
            location.href = 'addProduct.html';
        }

        else
        {
            $('#infoName').text(name);
            $('#infoUsername').text(username);
        }
    }

    else
    {
        location.href = 'index.html';
    }
}