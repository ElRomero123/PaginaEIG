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

    loadCases();
}

function loadCases()
{
    if(navigator.onLine)
    {
        $('#listResults').empty();
        $('#listResults').hide();
        $('#bannerState').css('display','block');
        $('#bannerState').css('background','yellow');
        $('#bannerState').css('color','black');
        $('#bannerState').text('Cargando tus casos ...');

        var idUser = localStorage.getItem('User');

        $.ajax
        (
            {
                url: '../api/case/?idUser=' + idUser,
                type: 'GET',
                contentType: "application/json;charset=utf-8",

                success:
                function (data) 
                {
                    if(data.length > 0)
                    {
                        var cadena = "";

                        for(var i = 0; i < data.length; i++)
                        {
                            cadena += "<div id='" + data[i].Id + "' class='result' onclick='toEditCase(this)'> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].Description + "</div> </div>";  
                        }
                        
                        $('#listResults').append(cadena);

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Tienes ' + i + ' caso(s)!');
                        $('#listResults').css('display','flex');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('NO has creado ningún caso!');
                    }
                }
            }
        );
    }

    else
    {
        $('#bannerState').css('background','red');
        $('#bannerState').css('color','white');
        $('#bannerState').text('No estás conectado a internet!');
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
        location.href = 'menu5.html';
    }
}

function toCreate(e)
{
    var kindP = document.getElementById("k" + e.id);
    var opcNum = kindP.innerHTML;
    localStorage.setItem('IdPackage', e.id);

    if(opcNum == 1)
    {
        location.href = 'addBusiness.html';
    }
    else if(opcNum == 2)
    {
        location.href = 'addProduct.html';
    }
    else if(opcNum == 3)
    { 
        location.href = 'addBusinessC.html';
    }
    else
    {
        location.href = 'addProductC.html';
    }
}