'use strict';

var ihrisko = null;
var protihracovaRuka = null;
var naRuke = [];
var karty = [];
var kopa = [];
var odhodeneKarty = [];
var protihracNaRuke = [];

var protihracZahralEso = false;
var hracZahralEso = false;

$(function() {
	ihrisko = $('#hra');
	protihracovaRuka = $('#protihrac');

	zamiesaj(karty);
	rozdaj();
	zvyrazniHratelneKarty();

	$('body').on('click', '#hra .karta', function(e) {
		if($(this).hasClass('hratelna')) {
			
			$(this).removeClass('hratelna')
			var idecko = $(this).attr('id');
			
			var result = $.map(naRuke, function(obj, index) {
				if(obj.id === idecko) {
					return index;
				}
			});

			var odhodenaKarta = naRuke.splice(result[0], 1);

			odhodeneKarty.push(odhodenaKarta[0]);

			if(odhodenaKarta[0].druh === 'eso') {
				hracZahralEso = true;
			}
			
			$(this).css('transform', 'rotate('+k12()+'deg)');
			$(this).appendTo('#odhodenaKopa');

			console.log('H>>> ' + odhodenaKarta[0].obr);

			zvyrazniHratelneKarty();
			tahProtiHraca();
			zvyrazniHratelneKarty();
			protihracZahralEso = false;
		}
	});

	$('#tahaciaKopa .karta').on('click', function(e) {
		tahajKartu();
		tahProtiHraca();
	});
});

function tahProtiHraca() {
	//console.log('protihrac-------');
	if(protihracNaRuke.length === 0) {
		alert('Vyhral protihrac');
		location.reload();
	}
	if(naRuke.length === 0) {
		alert('vyhra!');
		location.reload();
	}

	var coMozeZahrat = [];
	var jeTamEso = odhodeneKarty[odhodeneKarty.length-1].druh === 'eso';

	if(hracZahralEso === true) {
		//console.log('hrac zahral eso');
		protihracNaRuke.forEach(function(item, index) {
			if(item.druh === 'eso') {
				coMozeZahrat.push(item);
			}
		});
	} else {
		protihracNaRuke.forEach(function(item, index) {
			if(item.hratelna === true) {
				coMozeZahrat.push(item);
			}
		});
	}
	
	var coZahra = coMozeZahrat[Math.floor(Math.random() * coMozeZahrat.length)];

	if(typeof coZahra !== 'undefined') {
		if(coZahra.druh === 'eso') {
			protihracZahralEso = true;
			//console.log('protihac zahrava eso');
		}
	}

	if(typeof coZahra != 'undefined') {
		coZahra.hratelna = false;
		var idecko = coZahra.id;
		
		var result = $.map(protihracNaRuke, function(obj, index) {
			if(obj.id === idecko) {
				return index;
			}
		});

		$('#'+coZahra.id).removeClass('hratelna');

		var odhodenaKarta = protihracNaRuke.splice(result[0], 1);

		odhodeneKarty.push(odhodenaKarta[0]);
		console.log('zahral ' + odhodenaKarta[0].obr)
		
		$('#'+coZahra.id).css('transform', 'rotate('+k12()+'deg)');
		$('#'+coZahra.id).appendTo('#odhodenaKopa');
	} else {
		if(!hracZahralEso || protihracZahralEso) {
			protihracTahajKartu();
			//console.log('taha si');
		} else {
			console.log('stoji');
		}

		hracZahralEso = false;
	}

	//ak hráč nemá žiadne eso, ide rovno 2. krát
	if(typeof coZahra != 'undefined') {
		if(coZahra.druh === 'eso') {
			//console.log('protihac zahral eso');
			var result = $.map(naRuke, function(obj, index) {
				if(obj.druh === 'eso') {
					return index;
				}
			});

			if(result.length === 0) {
				console.log('hrac nema eso, protihrac ide este raz');
				tahProtiHraca();
				zvyrazniHratelneKarty();
			}
		}
	}

	zvyrazniHratelneKarty();
}

function protihracTahajKartu() {
	var tahanaKarta = kopa.splice(0, 1);
	protihracNaRuke.push(tahanaKarta[0]);
	
	var html = '<div class="karta" id="'+tahanaKarta[0].id+'" style="background-image:url(sedmovekarty/'+tahanaKarta[0].obr+'.jpg)"></div>';
	$(html).appendTo(protihracovaRuka);
	zvyrazniHratelneKarty();

	$('#tahaciaKopa .karta').each(function(index) {
		if($(this).attr('id') === tahanaKarta[0].id) {
			$(this).remove();
			console.log('potiahol si ' + tahanaKarta[0].obr);
		}
	});
};

function tahajKartu() {
	var tahanaKarta = kopa.splice(0, 1);
	naRuke.push(tahanaKarta[0]);
	
	var html = '<div class="karta" id="'+tahanaKarta[0].id+'" style="background-image:url(sedmovekarty/'+tahanaKarta[0].obr+'.jpg)"></div>';
	$(html).appendTo(ihrisko);
	zvyrazniHratelneKarty();

	$('#tahaciaKopa .karta').each(function(index) {
		if($(this).attr('id') === tahanaKarta[0].id) {
			$(this).remove();
			console.log('H>>> taha');
		}
	});
};

function zvyrazniHratelneKarty() {
	var najvyssiaOdhodenaKarta = odhodeneKarty[odhodeneKarty.length-1];

	naRuke.forEach(function(item, index) {
		if(protihracZahralEso) {
			//console.log('protihac zahral eso');
			
			if(item.druh === 'eso') {
				naRuke[index].hratelna = true;
				$('#hra').find('#'+item.id).addClass('hratelna');
			} else {
				naRuke[index].hratelna = false;
				$('#hra').find('#'+item.id).removeClass('hratelna');
			}
			protihracZahralEso = false;
		} else {
			if(najvyssiaOdhodenaKarta.farba === item.farba || najvyssiaOdhodenaKarta.druh === item.druh || item.druh === 'hornik') {
				naRuke[index].hratelna = true;
				$('#hra').find('#'+item.id).addClass('hratelna');
			} else {
				naRuke[index].hratelna = false;
				$('#hra').find('#'+item.id).removeClass('hratelna');
			}
		}
		
	});

	protihracNaRuke.forEach(function(item, index) {
		if(najvyssiaOdhodenaKarta.farba === item.farba || najvyssiaOdhodenaKarta.druh === item.druh || item.druh === 'hornik') {
			protihracNaRuke[index].hratelna = true;
			$('#protihrac').find('#'+item.id).addClass('hratelna');
		} else {
			protihracNaRuke[index].hratelna = false;
			$('#protihrac').find('#'+item.id).removeClass('hratelna');
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
	};

	//umiestni prvu kartu z kopy na plochu.
	var html = '<div class="karta otocena" id="'+kopa[0].id+'" style="background-image:url(sedmovekarty/'+kopa[0].obr+'.jpg)"></div>';
	$(html).appendTo('#odhodenaKopa');
	odhodeneKarty.push(kopa[0]);
	kopa.splice(0, 1);

	//umiestni karty na kopu
	kopa.forEach(function(item, index) {
		var html = '<div class="karta" id="'+item.id+'" style="background-image:url(sedmovekarty/rub.jpg)"></div>';
		$('#tahaciaKopa').append(html);
	});

	//umiestni na ruku
	naRuke.forEach(function(item, index) {
		var html = '<div class="karta" id="'+item.id+'" style="background-image:url(sedmovekarty/'+item.obr+'.jpg)"></div>';
		$(ihrisko).append(html);
	});

	//umiestni na ruku
	protihracNaRuke.forEach(function(item, index) {
		var html = '<div class="karta" id="'+item.id+'" style="background-image:url(sedmovekarty/'+item.obr+'.jpg)"></div>';
		$(protihracovaRuka).append(html);
	});
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