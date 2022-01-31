from datetime import datetime
import os

print('# Missing translations - ' + datetime.now().strftime('%d/%m/%Y') + '\n')
print('> use `py3 scripts/missing-translations.py > missing.md` from root to update file\n\n')

folder_images = "./public/_posts/"
pathNames = []
result = []
for dirpath, dirnames, filenames in os.walk(folder_images):
    pathNames.append(dirpath)
    result.append([a for a in filenames if a.endswith('md')])

missingCount = {
    'en.md': 0,
    'fr.md': 0,
    'es.md': 0,
    'de.md': 0,
    'pt.md': 0,
    'el.md': 0,
    'tr.md': 0,
    'vi.md': 0,
    'zh.md': 0,
    'hi.md': 0,
    'ja.md': 0,
}

expected = ['en.md', 'fr.md', 'es.md', 'de.md', 'pt.md', 'el.md', 'tr.md', 'vi.md', 'zh.md', 'hi.md', 'ja.md']
for name in pathNames:
    resultsByName = result[pathNames.index(name)]
    if (len(resultsByName) > 0):
        arr3 = []
        [arr3.append(el) if el not in resultsByName else '' for el in expected]
        [arr3.append(el) if el not in expected else '' for el in resultsByName]
        print('*'+name.rsplit('/', 1)[-1]+'*')
        for el in arr3:
            missingCount[el] += 1
            print('- [ ] ' + el)
        print('')
print('-----------------------------------------------------  ')
print('## Missing translations:  ')
for key, value in missingCount.items():
    print(key + ': ' + str(value)+ '  ')
print('-----------------------------------------------------  ')
