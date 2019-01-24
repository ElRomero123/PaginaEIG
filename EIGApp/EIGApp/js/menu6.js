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
        default:
        location.href = 'menu.html';
    }
}

function createJobApplication()
{
    alert('Aplicación laboral funciona!');
    /*
    $('#register').css('background','yellow');
    $('#register').css('border','2 px solid yellow');
    $('#register').css('color','black');
    $('#register').text('Enviando tu solicitud ...');

    if(navigator.onLine)
    {
        var jobApplication =
        {
            name:                   $('#campoName').val(),
            documentNumber:         $('#campoDocumentNumber').val(),
            descriptionApplication: $('#campoDescriptionApplication').val(),
            age:                    $('#campoAge').val(),
            idUser:                 localStorage.getItem('User')
        };
    
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
                    if(data)
                    {
                        $('#register').css('background','darkgreen');
                        $('#register').css('border','2 px solid darkgreen');
                        $('#register').css('color','white');
                        $('#register').text('Solicitud enviada!');
                    }
    
                    else
                    {
                        $('#register').css('background','red');
                        $('#register').css('border','2 px solid red');
                        $('#register').css('color','white');
                        $('#register').text('Error al enviar!');
                    }
                }
            }
        );
    }

    else
    {
        $('#register').css('background','red');
        $('#register').css('border','2 px solid red');
        $('#register').text('No estás conectado a Internet!');
    }
    */
}