from django.db import models

class Sensor(models.Model):
    TIPOS_SENSOR_CHOICES = [
        ("Temperatura", "Temperatura"),
        ("Umidade", "Umidade"),
        ("Contador", "Contador"),
        ("Luminosidade", "Luminosidade"),
    ]
    tipo = models.CharField(max_length=50, choices=TIPOS_SENSOR_CHOICES)
    mac_address = models.CharField(max_length=20, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    localizacao = models.CharField(max_length=100)
    responsavel = models.CharField(max_length=100)
    observacao = models.TextField(blank=True) 
    unidade_medida = models.CharField(max_length=20, blank=True, null=True)
    status_operacional = models.BooleanField(default=True)
    def str (self):
        return f"{self.tipo} - {self.localizacao}"

class TemperaturaData(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    valor = models.FloatField()
    #timestamp = models.DateTimeField(auto_now_add=True)
    timestamp = models.DateTimeField()
    def __str__(self):
        return f'Temperatura: {self.valor} °C - {self.timestamp}'
class UmidadeData(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    valor = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'Umidade: {self.valor}% - {self.timestamp}'
class ContadorData(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    valor = models.IntegerField()
    def __str__(self):
        return f'Contagem - {self.timestamp}'
class LuminosidadeData(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)  
    valor = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)  
    def __str__(self):
        return f'Luminosidade: {self.valor} Lux - {self.timestamp}'
# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)