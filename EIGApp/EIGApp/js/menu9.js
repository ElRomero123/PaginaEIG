window.onload = initUser;
var f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
var t = 'https://twitter.com/EliteIntellige1?lang=es';
var y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
var g = 'https://plus.google.com/u/0/109910140252090488175';

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

function confirmDonation()
{
    $('#confirmDonation').css('background','yellow');
    $('#confirmDonation').css('border','2px solid yellow');
    $('#confirmDonation').css('color','black');
    $('#confirmDonation').text('Confirmando donación ...');

    if(navigator.onLine)
    {
        var donation =
        {
            amount: $('#campoCantidad').val(),
            idUser: localStorage.getItem('User')
        };
        
        $.ajax
        (
            {
                url: '../api/donation',
                type: 'POST',
                data: JSON.stringify(donation),
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data)
                {
                    if (data)
                    {
                        $('#confirmDonation').css('background','darkgreen');
                        $('#confirmDonation').css('border','2px solid darkgreen');
                        $('#confirmDonation').css('color','white');
                        $('#confirmDonation').text('Donación confirmada!');
                    }
    
                    else
                    {
                        $('#confirmDonation').css('background','red');
                        $('#confirmDonation').css('border','2px solid red');
                        $('#confirmDonation').css('color','white');
                        $('#confirmDonation').text('Error en la confirmación!');
                    }
                }
            }
        );
    }

    else
    {
        $('#confirmDonation').css('background','red');
        $('#confirmDonation').css('border','2 px solid red');
        $('#confirmDonation').text('Sin internet!');
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
        default:
        location.href = 'menu.html';
    }
}

function social(op)
{
    switch(op)
    {
        case 1:
        window.open(f, '_blank');
        break;
        case 2:
        window.open(t, '_blank');
        break;
        case 3:
        window.open(y, '_blank');
        break;
        default:
        window.open(g, '_blank');
    }
}