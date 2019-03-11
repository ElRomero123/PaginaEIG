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
        location.href = 'manageJobApplication.html';
        break;
        default:
        location.href = 'menu.html';
    }
}

function createJA()
{
    var jobApplication =
    {
        name                   : $('#cName').val(),
        documentNumber         : $('#cDNumber').val(),
        descriptionApplication : $('#cDApplication').val(),
        age                    : $('#cAge').val(),
        idUser                 : localStorage.getItem('User')
    };

    if(validateText(jobApplication))
    {
        $('#createJobApplication').css('background','yellow');
        $('#createJobApplication').css('border','2 px solid yellow');
        $('#createJobApplication').css('color','black');
        $('#createJobApplication').text('Subiendo postulación ...');
    
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
                        $('#createJobApplication').css('background','darkgreen');
                        $('#createJobApplication').css('border','2px solid darkgreen');
                        $('#createJobApplication').css('color','white');
                        $('#createJobApplication').text('Postulación registrado!');
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

function validateText(input)
{
    var c1,c2,c3,c4;
    c1 = input.name.length                   >= 5;
    c2 = input.documentNumber.length         >= 6;
    c3 = input.descriptionApplication.length >= 20;
    c4 = input.age.length                    >= 1;
    return c1 & c2 && c3 && c4;
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