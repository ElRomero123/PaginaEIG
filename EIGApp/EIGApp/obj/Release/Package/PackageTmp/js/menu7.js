window.onload = initUser;

function initUser()
{
    var name     = localStorage.getItem('Name');
    var username = localStorage.getItem('Username');
    
    if(name != null)
    {
        $('#infoName').text(name);
        $('#infoUsername').text(username);
    }

    else
    {
        location.href = 'index.html';
    }
}

function to(num)
{
    switch(num)
    {
        case 1:
        localStorage.clear();
        location.href = 'index.html';
        break;
        case 2:
        location.href = 'managePackage.html';
        localStorage.setItem('Call', 3);
        break;
        case 3:
        location.href = 'menu.html';
        break;
        case 4:
        location.href = 'personPanelC.html';
        break;
        case 5:
        location.href = 'otherPersonPanelC.html';
        break;
        default:
        location.href = 'businessPanelC.html';
    }
}