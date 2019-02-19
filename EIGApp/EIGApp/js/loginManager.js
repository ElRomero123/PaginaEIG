window.onload = checkSesion;

function checkSesion()
{   
    if(localStorage.getItem('Name') != null)
    {
        location.href = 'menu.html';
    }
}

function option(num)
{
    switch(num)
    {
        case 1:
        if(navigator.onLine)
        {
            validate();
        }

        else
        {
            $('#send').css('background','red');
            $('#send').css('border','2px solid red');
            $('#send').text('NO está conectado a internet!');
        }
        
        break;
        default: location.href = 'index.html';
    }
}

function validate()
{
    var username = document.getElementById('boxUsername').value;
    var password = document.getElementById('boxPassword').value;

    $('#send').css('background','orangered');
    $('#send').css('border','2px solid orangered');
    $('#send').css('color','white');
    $('#send').text('Validando ...');

    $.ajax
    (
        {
            url: '../api/manager/?username=' + username + '&password=' + password,
            type: 'GET',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data.Name != null)
                {
                    localStorage.setItem('User', data.Id);
                    localStorage.setItem('Username', data.Username);
                    localStorage.setItem('Name', data.Name);
                    location.href = 'menuManager.html'; 
                }

                else
                {
                    $('#send').css('background','red');
                    $('#send').css('border','2px solid red');
                    $('#send').text('Administrador invalido!');
                }
            }
        }
    );
}