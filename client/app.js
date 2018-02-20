


// $(document).ready(function() {
// $.getJSON( "/chirps.json", function( data ) {
//     var items = [];
//     var text = [];
//     var html = '';
//     var showData = $('#show-data');
    
//     $.each( data, function( key, val ) {
//         console.log(key);
//         html += '<div class="dcell">';
//         html += '<h3 id="'+val.key+'">'+val.user+':</h3>';
//         html += '<p id="'+val.key+'">'+val.text+':</p>';
//         html += '</div>';
//     //   items.push( "<h3 id='" + key + "'>" + val.user + "</h3>" );
//     //   text.push("<p>" +val.text+ "</p>");
//     });

//     $( "#show-data").html(html);

//   });
// });


$(function(){ 
    const $chirps = $('#chirps');
    const $user = $('#chirpUser');
    const $text = $('#chirpText');
    var text = [];
    var items = [];
    var html = '';
    var showData = $('#show-data');

    var chirpTemplate = $('#chirp-template').html();

    function addChirp(chirp){
        // $chirps.append(Mustache.render(chirpTemplate, chirp))
        // $chirps.append('' + 
        // "<li>"+
        // "<p classname='chirper'><strong>Username:</strong>" + chirp.user +"</p>"+
        // "<p classname='chirps'><strong>Chirp:</strong>"+ chirp.text +"</p>"+ 
        // "<button data-id="+ id +"class='remove'>X</button>"+
        // "<button data-id="+ id +"classname=editChirp noedit>Edit</button>" +
        // "<button data-id="+ id +"classname=saveEdit edit>Save</button>" +
        // "<button data-id="+ id +"classname=cancelEdit edit>Cancel</button>" +
        // "</li>")
    }

   $.ajax({
        type: 'GET',
        url: "/api/chirps",
        success: function(chirps){
            $.each(chirps, (id, chirp)=>{ 
                if(id !== "nextid"){
                    html += "<li>";
                    html += "<p class='chirper'><strong>Username:</strong>" +chirp.user +"</p>";
                    html += "<p class='chirps'><strong>Chirp:</strong>"+chirp.text +"</p>";
                    html += "<button data-id=" + id +" class='remove'>X</button>";
                    html += "<button data-id=" + id +" class=editChirp noedit>Edit</button>";
                    html += "<button data-id=" + id +" class=saveEdit edit>Save</button>";
                    html += "<button data-id=" + id +" class=cancelEdit edit>Cancel</button>";
                    html += "</li>";
                }
            });
            $( "#chirps").append(html);
        },
        error: () => {
            alert('error loading chirps')
        }
    }); 

    $('#add-chirp').on('click', ()=>{
        var chirp = {
            user: $user.val(),
            text: $text.val(),
        };

        $.ajax({
            type: 'POST',
            traditional: true,
            url: "/api/chirps",
            async: false,
            data: chirp,
            success: function(newChirp){
                // addChirp(newChirp);
                $.post(chirps, (id, chirp)=>{ 
                $( "#chirps").append(
                     "<li>",
                     "<p class='chirper'><strong>Username:</strong>" +newChirp.user +"</p>",
                     "<p class='chirps'><strong>Chirp:</strong>"+newChirp.text +"</p>",
                     "<button data-id=" + id +" class='remove'>X</button>",
                     "<button data-id=" + id +" class=editChirp noedit>Edit</button>",
                     "<button data-id=" + id +" class=saveEdit edit>Save</button>",
                     "<button data-id=" + id +" class=cancelEdit edit>Cancel</button>",
                     "</li>"
                )
            });
            },
            
            error: () => {
                alert('error loading chirps')
            }
        });
    });

    

    $chirps.delegate('.remove','click', () => {
        var $li = $(this).closest('li');

        $.ajax({
            type: 'DELETE',
            url: "/api/chirps" + $(this).attr('data-id'),
            success: ()=>{
                $li.fadeOut(300, ()=>{
                  $(this).remove();  
                });
            }
        });
    });

    $chirps.delegate('.editChirp', 'click', () => {
        var $li = $(this).closest('li');
        $li.find('input.user'.val($li.find('span.user').html() ));
        $li.find('input.chirp'.val($li.find('span.chirp').html() ));
        $li.addClass('edit');
    });

    $chirps.delegate('.cancelEdit', 'click', () => {
        $(this).closest('li').removeClass('edit');
    });

    $chirps.delegate('.saveEdit', 'click', () => {
        var $li = $(this).closest('li');
        var chirp = {
            user: $li.find('input.user').val(),
            chirp: $li.find('input.chirp').val(),
        };
        $.ajax({
            type: 'PUT',
            url: "/api/chirps" + $li.attr('data-id'),
            data: chirp,
            success: function(newChirp){
            $li.find('span.user').html(chirp.user);
            $li.find('span.chirp').html(chirp.chirp);
            $li.removeClass('edit');
        },
        error: () => {
            alert('error updating chirps')
        }
      
    })
});

})




// $(document).ready(function () {
//     $('#get-data').click(function () {
//       var showData = $('#show-data');
  
//       $.getJSON('../chirps.json', function (data, keys, items) {
//         console.log(items);
  
//         var items = data.items.map(function (item) {
//           return item.key + ': ' + item.value;
//         });
  
//         showData.empty();
  
//         if (items.length) {
//           var content = '<li>' + items.join('</li><li>') + '</li>';
//           var list = $('<ul />').html(content);
//           showData.append(list);
//         }
//       });
  
//       showData.text('Loading the JSON file.');
//     });
//   });


//   $.ajax({
//     url: "url",
//     type: 'POST',
//     dataType: "html",
//     data:{id:params},
//     success: function(data, status, xhr) {
//         if(data==""){
//             window.location.href="/";
//         }
//         else{
//             BootstrapDialog.show({
//                 title: "Modal Tital",
//                 message: function(dialogRef){
//                     $mydata = $($.parseHTML(data));
//                     return $mydata;
//                 },
//                 onshow: function(dialog){

//             // and css change if need, eg. 
//              dialog.$modalHeader.css("float","none");

//                 },
//                 onshown:function(dialog)
//                 {
//                    // event after shown

//                 },
//                 onhide:function(dailog)
//                 {
//                    // event on hide
//                 }
//             });
//         }

//     },
//     statusCode: {
//         401: function () {
//             alert("Your session has been expired");

//         }
//     }
// });
