window.onload = initUser;
var fichero, fileReference;

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

    fichero = document.getElementById('fileBrowser');
}

function cerrarSesion()
{
    localStorage.clear();
    location.href = 'index.html';
}

function search(opcion)
{
    if(navigator.onLine)
    {
        $('#listResults').empty();
        $('#listResults').hide();
        $('#maps').empty();
        $('#bannerState').css('display','block');
        $('#bannerState').css('background','yellow');
        $('#bannerState').css('color','black');
        $('#bannerState').text('Buscando ...');
    
        var criterio = document.getElementById('searchBox').value;
    
        switch(opcion)
        {
            case 1:
            $.ajax
            (
                {
                    url: '../api/person/?cadena=' + criterio,
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
                                cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div id='text'> <p id='pf1'>" + data[i].Name + "</p> <p id='pf2'>" + data[i].ProfesionDescription + "</p> <p id='pf3'>" + data[i].WebPage + "</p> <p id='pf4'>" + data[i].Email + "</p> <p id='pf4'>" + data[i].Phone + "</p> <p id='pf4'>" + data[i].City + "</p> <p id='pf4'>" + + data[i].Address + "</p> </div> </div>";  
                            }
                            
                            $('#listResults').append(cadena);
    
                            for(var i = 0; i < data.length; i++)
                            {
                                document.getElementById(i).style.background = 'url("' + data[i].Avatar + '")';
                            }
    
                            $('#bannerState').css('background','green');
                            $('#bannerState').css('color','white');
                            $('#bannerState').text(i + ' investigador(es) encontrados!');
                            $('#listResults').css('display','flex');
                            $('#maps').append('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d757.0218273722048!2d-73.9316468375744!3d40.62795646258929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1546800277209" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>');
                            $('#maps').css('display','inline-block');     
                        }
    
                        else
                        {
                            $('#bannerState').css('background','red');
                            $('#bannerState').css('color','white');
                            $('#bannerState').text('Sin resultados!');
                        }
                    }
                }
            );
    
            break;
    
            case 2:
            $.ajax
            (
                {
                    url: '../api/otherPerson/?cadena=' + criterio,
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
                                cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div id='text'> <p id='pf1'>" + data[i].Name + "</p> <p id='pf2'>" + data[i].Profesion + "</p> <p id='pf2'>" + data[i].ProfesionDescription + "</p> <p id='pf3'>" + data[i].WebPage + "</p> <p id='pf4'>" + data[i].Email + "</p> <p id='pf4'>" + data[i].Phone + "</p> <p id='pf4'>" + data[i].City + "</p> <p id='pf4'>" + + data[i].Address + "</p> </div> </div>";  
                            } 
    
                            $('#listResults').append(cadena);
    
                            for(var i = 0; i < data.length; i++)
                            {
                                document.getElementById(i).style.background = 'url("' + data[i].Avatar + '")';
                            }
    
                            $('#bannerState').css('background','green');
                            $('#bannerState').css('color','white');
                            $('#bannerState').text(i + ' otros perfil(es) encontrados!');
                            $('#listResults').css('display','flex');
                            $('#maps').append('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d757.0218273722048!2d-73.9316468375744!3d40.62795646258929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1546800277209" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>');
                            $('#maps').css('display','inline-block');     
                        }
    
                        else
                        {
                            $('#bannerState').css('background','red');
                            $('#bannerState').css('color','white');
                            $('#bannerState').text('Sin resultados!');
                        }
                    }
                }
            );
            break;
    
            case 3:
            $.ajax
            (
                {
                    url: '../api/business/?cadena=' + criterio,
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
                                cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div id='text'> <p id='pf1'>" + data[i].Name + "</p> <p id='pf2'>" + data[i].Specialism + "</p> <p id='pf2'>" + data[i].SpecialismDescription + "</p> <p id='pf3'>" + data[i].WebPage + "</p> <p id='pf4'>" + data[i].Phone + "</p> <p id='pf4'>" + data[i].City + "</p> <p id='pf4'>" + data[i].Address + "</p> </div> </div>";  
                            } 
    
                            $('#listResults').append(cadena);
    
                            for(var i = 0; i < data.length; i++)
                            {
                                document.getElementById(i).style.background = 'url("' + data[i].Avatar + '")';
                            }
    
                            $('#bannerState').css('background','green');
                            $('#bannerState').css('color','white');
                            $('#bannerState').text(i + ' empresas(s) encontradas!');
                            $('#listResults').css('display','flex');
                            $('#maps').append('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d757.0218273722048!2d-73.9316468375744!3d40.62795646258929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1546800277209" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>');
                            $('#maps').css('display','inline-block'); 
                        }
    
                        else
                        {
                            $('#bannerState').css('background','red');
                            $('#bannerState').css('color','white');
                            $('#bannerState').text('Sin resultados!');
                        }
                    }
                }
            );
            break;
    
            default:
            $.ajax
            (
                {
                    url: '../api/product/?cadena=' + criterio,
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
                                cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div id='text'> <p id='pf1'>" + data[i].Name + "</p> <p id='pf2'>" + data[i].Type + "</p> <p id='pf2'>" + data[i].TypeDescription + "</p> <p id='pf3'>" + data[i].AttendantName + "</p> <p id='pf3'>" + data[i].AttendantPhone + "</p>  <p id='pf3'>" + data[i].AttendantEmail + "</p> <p id='pf4'>" + data[i].City + "</p> <p id='pf4'>" + data[i].Address + "</p> <p id='pf4'>" + data[i].Date + "</p> </div> </div>";  
                            } 
    
                            $('#listResults').append(cadena);
    
                            for(var i = 0; i < data.length; i++)
                            {
                                document.getElementById(i).style.background = 'url("' + data[i].Avatar + '")';
                            }
    
                            $('#bannerState').css('background','green');
                            $('#bannerState').css('color','white');
                            $('#bannerState').text(i + ' promocion(es) encontradas!');
                            $('#listResults').css('display','flex');
                            $('#maps').append('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d757.0218273722048!2d-73.9316468375744!3d40.62795646258929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1546800277209" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>');
                            $('#maps').css('display','inline-block'); 
                        }
    
                        else
                        {
                            $('#bannerState').css('background','red');
                            $('#bannerState').css('color','white');
                            $('#bannerState').text('Sin resultados!');
                        }
                    }
                }
            );
        }
    }

    else
    {
        $('#bannerState').css('background','red');
        $('#bannerState').css('color','white');
        $('#bannerState').text('No estás conectado a internet!');
    }
}

function searchByEnter(e,opcion)
{
    if (e.keyCode === 13 && !e.shiftKey) 
    {
        search(opcion);
    }
}

function createCase()
{
    if(navigator.onLine)
    {
        $('#register').css('background','yellow');
        $('#register').css('border','2 px solid yellow');
        $('#register').css('color','black');
        $('#register').text('Enviando caso ...');
    
        var caso =
        {
            name:            $('#campoCase').val(),
            descriptionCase: $('#campoDescription').val(),
            idUser:          localStorage.getItem('User')
        };
    
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
                    if(data)
                    {
                        $('#register').css('background','darkgreen');
                        $('#register').css('border','2 px solid darkgreen');
                        $('#register').css('color','white');
                        $('#register').text('Se envío tu caso!');
                    }
    
                    else
                    {
                        $('#register').css('background','red');
                        $('#register').css('border','2 px solid red');
                        $('#register').css('color','white');
                        $('#register').text('No se pudo envíar tu caso!');
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
}

function createJobApplication()
{
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
}

function upload()
{
    $('#register').css('background','yellow');
    $('#register').css('border','2 px solid yellow');
    $('#register').css('color','black');
    $('#register').text('Subiendo archivo ...');

    if(navigator.onLine)
    {
        var config = 
        {
            apiKey: "AIzaSyA4F7aYKhXv5zEWabtUYABA-4lJJdAgyW4",
            authDomain: "eliteintelligencegroup-719d3.firebaseapp.com",
            databaseURL: "https://eliteintelligencegroup-719d3.firebaseio.com",
            projectId: "eliteintelligencegroup-719d3",
            storageBucket: "eliteintelligencegroup-719d3.appspot.com",
            messagingSenderId: "567347907651"
        };
    
        firebase.initializeApp(config);
    
        fileReference = firebase.storage().ref();
    
        var fileToUpload = fichero.files[0];
        var uploadTask = fileReference.child('/avatar/' + fileToUpload.name).put(fileToUpload);
    
        uploadTask.on('state_changed', 
        
            function(snapshot)
            {
                //Se va mostrando el progreso de la subida
            },
    
            function(error)
            {
                alert('Hubo un error');
            },
            function()
            {
                $('#register').css('background','darkgreen');
                $('#register').css('border','2 px solid darkgreen');
                $('#register').css('color','white');
                $('#register').text('Archivo subido!');

                URLDescarga = uploadTask.snapshot.downloadURL;
                alert('Se subió la imagen con url: ' + URLDescarga);
            }
        );
    }

    else
    {
        $('#register').css('background','red');
        $('#register').css('border','2 px solid red');
        $('#register').text('No estás conectado a Internet!');
    }
}

function to(num)
{
    switch(num)
    {
        case 1:
        location.href = 'menu.html';
        break;
        case 2:
        location.href = 'menu2.html';
        break;
        case 3:
        location.href = 'menu3.html';
        break;
        case 4:
        location.href = 'menu4.html';
        break;
        case 5:
        location.href = 'menu5.html';
        break;
        case 6:
        location.href = 'menu6.html';
        break;
        case 7:
        location.href = 'menu7.html';
        break;
        default:
        location.href = 'menu8.html';
    }
}