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

function to(num)
{
    switch(num)
    {
        case 1:
        localStorage.clear();
        location.href = 'index.html';
        break;
        case 2:
        location.href = 'manageJobApplication.html';
        break;
        default:
        location.href = 'menu.html';
    }
}

function createJA()
{
    if(validateText())
    {
        var jobApplication =
        {
            name: $('#campoName').val(),
            documentNumber: $('#campoDocumentNumber').val(),
            descriptionApplication: $('#campoDescriptionApplication').val(),
            age: $('#campoAge').val(),
            idUser: localStorage.getItem('User')
        };
    
        $('#createJobApplication').css('background','yellow');
        $('#createJobApplication').css('border','2 px solid yellow');
        $('#createJobApplication').css('color','black');
        $('#createJobApplication').text('Creando postulación ...');
    
        $.ajax
        (
            {
                url: '../api/jobApplication',
                type: 'POST',
                data: JSON.stringify(jobApplication),
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data)
                {
                    if (data)
                    {
                        location.href = 'manageJobApplication.html';    
                    }
    
                    else
                    {
                        $('#createJobApplication').css('background','red');
                        $('#createJobApplication').css('border','2px solid red');
                        $('#createJobApplication').css('color','white');
                        $('#createJobApplication').text('Error creando postulación!');
                    }
                }
            }
        );
    }

    else
    {
        $('#createJobApplication').css('background','red');
        $('#createJobApplication').css('border','2px solid red');
        $('#createJobApplication').text('Entradas invalidas!');
    }
}

function validateText()
{
    return true;
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