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
            idUser: localStorage.getItem('campoAge')
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