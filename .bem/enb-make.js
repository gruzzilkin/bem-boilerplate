module.exports = function(config) {
	var fs = require('fs');

	config.nodes('pages-desktop/*');

	config.nodeMask(/pages\-desktop\/.*/, function(nodeConfig) {
		if (nodeConfig.getPath() === 'pages-desktop/common') {
			var pagesDeps = [],
				addTechsAttrs = [
					[ require("enb/techs/levels"), { levels: getLevels(config) } ],
					require("enb/techs/files"),
					require("enb/techs/js"),
					require("enb/techs/css-stylus")
				];

			// Проходимся по существующим страницам
			fs.readdirSync('pages-desktop').map(function (page) {
				if (page !== 'common' && fs.existsSync('pages-desktop/' + page + '/' + page + '.deps.js')) {
					// Копируем депсы с каджой страницы внутрь common
					addTechsAttrs.push([ require('enb/techs/deps-provider'), { sourceNodePath: 'pages-desktop/' + page, depsTarget: page + '.deps.js' } ]);

					pagesDeps.push(page + '.deps.js');
				}
			});

			// Мерджим все полученные депмы в один - common.deps.js
			addTechsAttrs.push([ require('enb/techs/deps-merge'), { depsSources: pagesDeps } ]);

			// прокидываем атрибуты
			nodeConfig.addTechs(addTechsAttrs);
			nodeConfig.addTargets([
				'_?.js', '_?.css'
			]);
		} else {
			nodeConfig.addTechs([
				new (require('enb/techs/file-provider'))({ target: '?.bemjson.js' }),
				new (require('enb/techs/bemdecl-from-bemjson'))(),
				new (require('enb/techs/levels'))({ levels: getLevels(config) }),
				new (require('enb/techs/deps-old'))(),
				new (require('enb/techs/files'))(),
				new (require('bh/techs/bh-server'))(),
				new (require('enb/techs/html-from-bemjson'))(),
				new (require('enb/techs/js'))(),
				new (require('enb/techs/css-stylus'))()
			]);
			nodeConfig.addTargets([
				'?.html', '_?.js', '_?.css'
			]);
		}
	});

	config.mode('development', function() {
		config.nodeMask(/pages\-desktop\/.*/, function(nodeConfig) {
			nodeConfig.addTechs([
				new (require('enb/techs/file-copy'))({ sourceTarget: '?.js', destTarget: '_?.js' }),
				new (require('enb/techs/file-copy'))({ sourceTarget: '?.css', destTarget: '_?.css' })
			]);
		});
	});

	config.mode('production', function() {
		config.nodeMask(/pages\-desktop\/.*/, function(nodeConfig) {
			nodeConfig.addTechs([
				new (require('enb/techs/borschik'))({ sourceTarget: '?.js', destTarget: '_?.js' }),
				new (require('enb/techs/borschik'))({ sourceTarget: '?.css', destTarget: '_?.css' })
			]);
		});
	});
};

function getLevels(config) {
	return [
		'blocks-core'
	].map(function(level) {
		return config.resolvePath(level);
	});
}