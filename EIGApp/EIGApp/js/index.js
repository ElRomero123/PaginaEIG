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
        alert('Hola');
        /*
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
            */
        break;
        case 2:
        location.href = 'register.html';
        break;

        default:
        location.href = 'loginManager.html';
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
            url: '../api/user/?username=' + username + '&password=' + password,
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
                    location.href = 'menu.html'; 
                }

                else
                {
                    $('#send').css('background','red');
                    $('#send').css('border','2px solid red');
                    $('#send').text('Usuario invalido!');
                }
            }
        }
    );
}