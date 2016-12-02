'use strict';

var ihrisko = null;
var naRuke = [];
var karty = [];
var kopa = [];
var odhodeneKarty = [];
var protihracNaRuke = [];

$(function() {
	ihrisko = $('#hra');

	zamiesaj(karty);
	rozdaj();
	dajPrvu();
	setTimeout(zvyrazniHratelneKarty, 100);

	$('body').on('click', '#hra .karta', function(e) {
		if($(this).hasClass('hratelna')) {
			
			$(this).removeClass('hratelna')
			var idecko = $(this).attr('id');
			
			var result = $.map(naRuke, function(obj, index) {
				if(obj.id === idecko) {
					return index;
				}
			})

			var odhodenaKarta = naRuke.splice(result[0], 1);

			odhodeneKarty.push(odhodenaKarta[0]);
			
			$(this).css('transform', 'rotate('+k12()+'deg)');
			$(this).appendTo('#odhodenaKopa');

			zvyrazniHratelneKarty();
		}
	});

	$('#tahaciaKopa .karta').on('click', function(e) {
		tahajKartu();
	});
});

function tahajKartu() {
	var tahanaKarta = kopa.splice(0, 1);
	naRuke.push(tahanaKarta[0]);
	
	var html = '<div class="karta" id="'+tahanaKarta[0].id+'" style="background-image:url(sedmovekarty/'+tahanaKarta[0].obr+'.jpg)"></div>';
	$(html).appendTo(ihrisko);
	zvyrazniHratelneKarty();
};

function zvyrazniHratelneKarty() {
	var najvyssiaOdhodenaKarta = odhodeneKarty[odhodeneKarty.length-1];

	naRuke.forEach(function(item, index) {
		if(najvyssiaOdhodenaKarta.farba === item.farba || najvyssiaOdhodenaKarta.druh === item.druh || item.druh === 'hornik') {
			$('#'+item.id).addClass('hratelna');
		} else {
			$('#'+item.id).removeClass('hratelna');
		}
	});
};

function rozdaj() {
	//hracovi
	for(var i=0; i<5; i++) {
		naRuke.push(karty[i]);
	};
	//protihracovi
	for(var i=5; i<10; i++) {
		protihracNaRuke.push(karty[i]);
	};
	//zvysok na kopu
	for(var i=10; i<32; i++) {
		kopa.push(karty[i]);
		var html = '<div class="karta" id="'+karty[i].id+'" style="background-image:url(sedmovekarty/rub.jpg)"></div>';
		$('#tahaciaKopa').append(html);
	};

	naRuke.forEach(function(item, index) {
		var html = '<div class="karta" id="'+karty[index].id+'" style="background-image:url(sedmovekarty/'+karty[index].obr+'.jpg)"></div>';
		$(ihrisko).append(html);
	});
};

function dajPrvu() {
	var html = '<div class="karta otocena" id="'+kopa[0].id+'" style="background-image:url(sedmovekarty/'+kopa[0].obr+'.jpg)"></div>';
	$(html).appendTo('#odhodenaKopa');
	odhodeneKarty.push(kopa[0]);
	kopa.splice(0, 1);
};

function zamiesaj(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    };
};

function k12() {
	return Math.floor(Math.random() * 12 - 6);
}

karty = [
	{'id': '_0', 'druh': 'eso', 'farba': 'gula', 'obr': 'eso-gula'},
	{'id': '_1', 'druh': 'eso', 'farba': 'srdce', 'obr': 'eso-srdce'},
	{'id': '_2', 'druh': 'eso', 'farba': 'zalud', 'obr': 'eso-zalud'},
	{'id': '_3', 'druh': 'eso', 'farba': 'zelen', 'obr': 'eso-zelen'},
	{'id': '_4', 'druh': 'kral', 'farba': 'gula', 'obr': 'kral-gula'},
	{'id': '_5', 'druh': 'kral', 'farba': 'srdce', 'obr': 'kral-srdce'},
	{'id': '_6', 'druh': 'kral', 'farba': 'zalud', 'obr': 'kral-zalud'},
	{'id': '_7', 'druh': 'kral', 'farba': 'zelen', 'obr': 'kral-zelen'},
	{'id': '_8', 'druh': 'hornik', 'farba': 'gula', 'obr': 'hornik-gula'},
	{'id': '_9', 'druh': 'hornik', 'farba': 'srdce', 'obr': 'hornik-srdce'},
	{'id': '_10', 'druh': 'hornik', 'farba': 'zalud', 'obr': 'hornik-zalud'},
	{'id': '_11', 'druh': 'hornik', 'farba': 'zelen', 'obr': 'hornik-zelen'},
	{'id': '_12', 'druh': 'dolnik', 'farba': 'gula', 'obr': 'dolnik-gula'},
	{'id': '_13', 'druh': 'dolnik', 'farba': 'srdce', 'obr': 'dolnik-srdce'},
	{'id': '_14', 'druh': 'dolnik', 'farba': 'zalud', 'obr': 'dolnik-zalud'},
	{'id': '_15', 'druh': 'dolnik', 'farba': 'zelen', 'obr': 'dolnik-zelen'},
	{'id': '_16', 'druh': 'x', 'farba': 'gula', 'obr': 'x-gula'},
	{'id': '_17', 'druh': 'x', 'farba': 'srdce', 'obr': 'x-srdce'},
	{'id': '_18', 'druh': 'x', 'farba': 'zalud', 'obr': 'x-zalud'},
	{'id': '_19', 'druh': 'x', 'farba': 'zelen', 'obr': 'x-zelen'},
	{'id': '_20', 'druh': 'ix', 'farba': 'gula', 'obr': 'ix-gula'},
	{'id': '_21', 'druh': 'ix', 'farba': 'srdce', 'obr': 'ix-srdce'},
	{'id': '_22', 'druh': 'ix', 'farba': 'zalud', 'obr': 'ix-zalud'},
	{'id': '_23', 'druh': 'ix', 'farba': 'zelen', 'obr': 'ix-zelen'},
	{'id': '_24', 'druh': 'viii', 'farba': 'gula', 'obr': 'viii-gula'},
	{'id': '_25', 'druh': 'viii', 'farba': 'srdce', 'obr': 'viii-srdce'},
	{'id': '_26', 'druh': 'viii', 'farba': 'zalud', 'obr': 'viii-zalud'},
	{'id': '_27', 'druh': 'viii', 'farba': 'zelen', 'obr': 'viii-zelen'},
	{'id': '_28', 'druh': 'vii', 'farba': 'gula', 'obr': 'vii-gula'},
	{'id': '_29', 'druh': 'vii', 'farba': 'srdce', 'obr': 'vii-srdce'},
	{'id': '_30', 'druh': 'vii', 'farba': 'zalud', 'obr': 'vii-zalud'},
	{'id': '_31', 'druh': 'vii', 'farba': 'zelen', 'obr': 'vii-zelen'}
];