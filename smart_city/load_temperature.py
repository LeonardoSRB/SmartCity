import csv
from datetime import datetime 
from dateutil import parser
import pytz
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_city.settings') 
django.setup()
from app_smart.models import TemperaturaData, Sensor
from django.utils import timezone

def load_temperature_data(file_path):
    try:
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile, delimiter=',')
            for row in reader:
                try:
                    sensor_id = int(row['sensor_id'])
                    sensor = Sensor.objects.get(id=sensor_id)
                    timestamp = parser.parse(row['timestamp'])
                    
                    # Torna o timestamp "aware"
                    timestamp = timezone.make_aware(timestamp)

                    TemperaturaData.objects.create(
                        sensor_id=sensor_id,
                        sensor=sensor,
                        valor=float(row['valor']),
                        timestamp=timestamp
                    )
                except (ValueError, KeyError, Sensor.DoesNotExist) as e:
                    print(f"Erro ao processar a linha: {row}, erro: {e}")
    except FileNotFoundError:
        print(f"O arquivo {file_path} não foi encontrado.")
    except Exception as e:
        print(f"Ocorreu um erro ao ler o arquivo: {e}")



# def load_temperature_data(csv_file_path):
#     print("Início da importação:", datetime.now().strftime('%Y-%m-%d %H:%M:%S')) 
#     with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
#         reader = csv.DictReader(csvfile) 
#         line_count = 0
#         for row in reader:
#             sensor_id = int(row['sensor_id'])
#             valor = float(row['valor'])
#             timestamp = parser.parse(row['timestamp'])
#             sensor = Sensor.objects.get(id=sensor_id)
#             TemperaturaData.objects.create(sensor=sensor, valor=valor, timestamp=timestamp)
#             line_count += 1
#             if line_count % 10000 == 0 :
#                 print(f'{line_count} linhas processadas...')
#                 print("Fim da importação:", datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
#                 print(f"Dados carregados com sucesso de {csv_file_path}")
#             load_temperature_data('media/temperatura_data_final.csv')