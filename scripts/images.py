import os
from PIL import Image 

folder_images = "../public/_posts/_tweets"
result = "filter \"**/*.md\"\n\n"

for dirpath, dirnames, filenames in os.walk(folder_images):
    for path_image in filenames:
        if (path_image.endswith('md')):
            continue
        if 'cover' in path_image:
            continue
        image = os.path.abspath(os.path.join(dirpath, path_image))
        with Image.open(image) as img:
            width, heigth = img.size
            result += "in \"**"+dirpath.removeprefix(folder_images)+"/*.md\"\n"
            result += "replace \""+path_image+")\"\n"
            result += "with \""+path_image+'?w='+str(width)+'&h='+str(heigth)+")\"\n\n"
print(result)