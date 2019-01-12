function option(num)
{
    switch(num)
    {
        case 1:
        validate();
        break;
        default: location.href = 'register.html';
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
                    localStorage.setItem('Name', data.Name);
                    localStorage.setItem('Phone', data.Phone);
                    localStorage.setItem('Email', data.Email);
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