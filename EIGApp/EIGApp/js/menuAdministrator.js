window.onload = initUser;

function initUser()
{
    var name     = localStorage.getItem('Name');
    var email = localStorage.getItem('Email');
    
    if(email != null)
    {
        $('#infoName').text(name);
        $('#infoUsername').text(email);
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
        location.href = 'menuProfilesAdministrator.html';
        break;
        case 3:
        location.href = 'menuCasesAdministrator.html';
        break;
        case 4:
        location.href = 'menuApplicationsAdministrator.html';
        break;
        case 5:
        location.href = 'menuSuggestionsAdministrator.html';
        break;
        default:
        location.href = 'menuDonationsAdministrator.html';
    }
}