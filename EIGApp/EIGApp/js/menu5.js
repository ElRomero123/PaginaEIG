window.onload = initUser;
var f,t,y,g;
f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
t = 'https://twitter.com/EliteIntellige1?lang=es';
y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
g = 'https://plus.google.com/u/0/109910140252090488175';

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
        location.href = 'manageCases.html';
        break;
        default:
        location.href = 'menu.html';
    }
}

function createCase()
{
    var caso =
    {
        name: $('#cCase').val(),
        descriptionCase: $('#cDescription').val(),
        idUser: localStorage.getItem('User')
    };

    if(validateText(caso))
    {
        $('#createCase').css('background','yellow');
        $('#createCase').css('border','2 px solid yellow');
        $('#createCase').css('color','black');
        $('#createCase').text('Creando caso ...');
    
        $.ajax
        (
            {
                url: '../api/case',
                type: 'POST',
                data: JSON.stringify(caso),
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data)
                {
                    if (data)
                    {
                        $('#createCase').css('background','darkgreen');
                        $('#createCase').css('border','2px solid darkgreen');
                        $('#createCase').css('color','white');
                        $('#createCase').text('Caso registrado!');
                    }
    
                    else
                    {
                        $('#createCase').css('background','red');
                        $('#createCase').css('border','2px solid red');
                        $('#createCase').css('color','white');
                        $('#createCase').text('Error creando caso!');
                    }
                }
            }
        );
    }

    else
    {
        $('#createCase').css('background','red');
        $('#createCase').css('border','2px solid red');
        $('#createCase').text('Entradas invalidas!');
    }
}

function validateText(input)
{
    var c1,c2;
    c1 = input.name.length            >= 8;
    c2 = input.descriptionCase.length >= 15;
    return c1 & c2;
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