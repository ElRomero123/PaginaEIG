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

function createSuggestion()
{
    $('#createSuggestion').css('background','yellow');
    $('#createSuggestion').css('border','2 px solid yellow');
    $('#createSuggestion').css('color','black');
    $('#createSuggestion').text('Enviando tu sugerencia ...');

    if(navigator.onLine)
    {
        var suggestion =
        {
            name:        $('#campoName').val(),
            description: $('#campoDocumentNumber').val(),
            idUser:      localStorage.getItem('User')
        };
    
        $.ajax
        (
            {
                url: '../api/suggestion',
                type: 'POST',
                data: JSON.stringify(suggestion),
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data)
                {
                    if(data)
                    {
                        $('#createSuggestion').css('background','darkgreen');
                        $('#createSuggestion').css('border','2 px solid darkgreen');
                        $('#createSuggestion').css('color','white');
                        $('#createSuggestion').text('Sugerencia enviada!');
                    }
    
                    else
                    {
                        $('#createSuggestion').css('background','red');
                        $('#createSuggestion').css('border','2 px solid red');
                        $('#createSuggestion').css('color','white');
                        $('#createSuggestion').text('Error en el envío!');
                    }
                }
            }
        );
    }

    else
    {
        $('#createSuggestion').css('background','red');
        $('#createSuggestion').css('border','2 px solid red');
        $('#createSuggestion').text('Sin internet!');
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