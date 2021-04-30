import h5py
import keras
from time import time
from keras.models import Sequential
from keras.layers import Dense, Flatten
from keras.applications.resnet50 import ResNet50, decode_predictions, preprocess_input
import matplotlib.pyplot as plt
from keras.utils.vis_utils import plot_model
from keras.models import load_model
from keras.preprocessing import image
import numpy as np
from os import path

def DecodePredict(pos):
    switcher = {
        0: "Aguadito de pollo",
        1: "Ají de pollo y arroz",
        2: "Almendras",
        3: "Anticucho con papa",
        4: "Arroz chaufa de pollo",
        5: "Arroz con leche",
        6: "Arroz con pollo",
        7: "Causa rellena",
        8: "Cebiche de pescado",
        9: "Chanfainita con arroz",
        10: "Choclo con queso",
        11: "Granadilla",
        12: "Lomo saltado con arroz",
        13: "Manzana delicia roja",
        14: "Maní",
        15: "Mazamorra morada",
        16: "Pan con chicharron",
        17: "Pan con pollo",
        18: "Panqueques",
        19: "Papa a la huancaína",
        20: "Pasas",
        21: "Pecanas",
        22: "Pistachos",
        23: "Pizza",
        24: "Plátano de seda",
        25: "Pollo a la brasa con papas fritas",
        26: "Pollo broaster con papas fritas",
        27: "Sandía",
        28: "Sopa seca con carapulcra",
        29: "Tacacho con cecina",
        30: "Tallarines rojos con pollo",
        31: "Tallarines saltados con pollo",
        32: "Tallarines verdes con churrasco",
        33: "Tamal de pollo",
        34: "Triple",
        35: "Uva italia"
    }
    return switcher.get(pos,"Invalid")

def predict(path):
    img = image.load_img(path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    preds = model.predict(x)
    return pick3(preds)

def pick3(tup):
    lst=[]
    lst = tup[0]
    ranks = sorted( [(x, i) for (i, x) in enumerate(lst)], reverse=True )
    values = []
    posns = []
    nombres = []
    margen = []
       
    for x,i in ranks:
        if x not in values:
            values.append( x )
            posns.append( i )
            if len(values) == 3:
                break
    for i in posns:
       nombres.append(DecodePredict(i))
    for i in values:
       margen.append(round(i*100,2))
    
    print("Las predicciones de " + "here" + " son: ")   
    return[ nombres[i] for i in range(len(values)) ]

def position(pos):
    switcher = {
	0: "primer",
	1: "segundo",
	2: "tercero"
    }
    return switcher.get(pos,"Invalid")

start_time = time()
model = load_model(path.dirname(__file__) + "/model-best.h5")
elapsed_time = time() - start_time
